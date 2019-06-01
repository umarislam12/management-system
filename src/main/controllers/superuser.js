var User = require("../models/superuser");
var query = "";

class SuperUserController {
  register(req, res) {
    console.log("body is", req.body);
    res.json({ msg: "superuser works" });
    const superuser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
      //confirm_password: req.body.confirm_password,
      //user_role: req.body.user_role
    };
    try {
      query =
        "INSERT INTO admin (name, email,password) VALUES('john','john@gmail.com','54321')";
      //var values = [superuser.name, superuser.email, superuser.password];

      //let superuser = [superuser.name, superuser.email, superuser.password];
      // let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
      // let query = mysql.format(insertQuery,["todo","user","notes",data.user,data.value]);
      sql.query(query, function(err, result) {
        if (err) {
          console.log("body is", err);
          res.status(302).json({ error: err.sqlMessage, status: 302 });
        } else {
          res
            .status(200)
            .json({ message: "Registered successfully", status: 200 });
        }
      });
    } catch (err) {
      console.log(err.stack);
      return err.stack;
    }
  }

  login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    query =
      "SELECT idadmin,name,email FROM admin WHERE email = ? AND password = ?";
    sql.query(query, [email, password], (err, result) => {
      if (err) {
        res.status(302).json({ response: err.sqlMessage, status: 302 });
      } else {
        // res.status(200).json({'response': result[0], status: 200});
        if (result.length > 0) {
          res.status(200).json({ response: result[0], status: 200 });
        } else {
          res.status(301).json({ response: [], status: 301 });
        }
      }
    });
  }
}

const superuserController = new SuperUserController();
module.exports = superuserController;
