const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection.js');

//create user to page:
router.post('/user',(req,res) =>{
    const data = req.body;
    var queryString = 'select * from siteuser where userid = ? AND password = ?';
      mysqlConnection.query(queryString,[data.userId,data.password],(err,result)=>{
        if(err){
          console.log(err);
        }else{
          console.log("succeed", result);
          res.send(result);
        }
      });
});
  
//login into admin user
router.post('/admin',(req,res) =>{
const data = req.body;
var queryString = 'select * from admin where adminId = ? AND adminpassword = ?';
    mysqlConnection.query(queryString,[data.userId,data.password],(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log("succeed");
        // res.redirect('/');
    }
    });
});
  
module.exports = router;
