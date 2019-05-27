var User = require("../models/user");
var query = '';

class UserController {
    register(req, res) {  
        console.log('body is', req.body);
               
        const user = { 
            first_name: req.body.first_name,
            last_name: req.body.last_name, 
            email: req.body.email, 
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            user_role: req.body.user_role
        };
        try 
        {
            query = "INSERT INTO users set ?";
            sql.query(query, user, function (err, result) {
                if(err){   
                    console.log('body is', err);
                    res.status(302).json({'error': err.sqlMessage, status: 302});
                }else{
                    res.status(200).json({'message': 'Registered successfully', status: 200});
                }                
            });
        }
        catch(err) {
            console.log(err.stack);            
            return err.stack;
        };
    }

    login(req, res){        
        let email = req.body.email;
        let password = req.body.password;
        query = "SELECT idusers,first_name,last_name,email,user_role FROM users WHERE email = ? AND password = ?";
        sql.query(query,[email,password],(err, result) => {                        
            if(err){                
                res.status(302).json({'response': err.sqlMessage, status: 302});
            }else{
                // res.status(200).json({'response': result[0], status: 200});
                if(result.length > 0){
                    res.status(200).json({'response': result[0], status: 200});
                }else{
                    res.status(301).json({'response': [], status: 301});
                }
            }   
        })
    }
}

const userController = new UserController();
module.exports = userController;