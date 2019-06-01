var express = require("express");
var http = require("http");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./src/routes/user");
const superuserRouter = require("./src/routes/superuser");

// Set up the express app
const app = express();
const PORT = 4000;
app.use(morgan("dev"));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(userRouter);
//Root route
app.get("/", (req, res) => res.send("hello world"));
//use routes
app.use("/api/superuser", superuserRouter);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    errors: {
      message: error.message
    }
  });
});

//connect to SQL
const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "myycomputer",
  database: "managemement_system",
  port: 3306
});

sql.connect(err => {
  if (err) {
    console.log("ughh failed" + JSON.stringify(err, undefined, 2));
    throw err;
  }
  console.log("my sql connected");
});
global.sql = sql;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
