const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection.js');

//create user
router.post('/user',(req,res) =>{
    const data = req.body;
    const queryString = 'INSERT INTO siteUser VALUES (?,?,?,?,?,?,?,?,?)';
    var params = [data.userId,data.username,data.password,data.photo,data.profile,
                data.firstName,data.lastName,data.email,data.phoneNum];  
    mysqlConnection.query(queryString,params,(err,result)=>{
        if(err){
          console.log(err);
          res.send(err);
        }else{
          console.log("create user success")
          res.send(result);
        //   res.redirect('/');
        }
    })
});
 
//create administer
router.post('/admin',(req,res) =>{
    const data = req.body;
    const queryString = 'INSERT INTO admin VALUES (?,?,?)';
    var params = [data.adminId,data.adminname,data.adminpassword];  
    mysqlConnection.query(queryString,params,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log("create admin success")
            // res.redirect('/');
        }
    })
});
  
//createReview 
router.post('/review', (req, res) => {
    const queryString = 'insert into review values (?,?,?,?,?,?,?)';
    const data = req.body;
    var params = [data.reviewId,data.createdDate,data.reviewDescription,
                data.rating,data.userId,data.locationId,data.title];
    mysqlConnection.query(queryString,params, (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
            console.log("succeed to post review");
            // res.redirect('/');
            res.sendStatus(200);
        }
    })
});

//"userID":"john123","createdDate":"09/01/19","comment":"you so good","reviewId":"1"
//Create Comment 
router.post('/comment', (req, res) => {
    const queryString = 'insert into comment values (?,?,?,?,?)';
    const data = req.body;
    var params = [data.commentId,data.userId,data.createdDate,data.comment,data.reviewId];
    mysqlConnection.query(queryString,params, (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
        console.log("succeed to post comment");
        res.send(result);
        // res.redirect('/');
        }
    })
});
  
//Create Location 
router.post('/location', (req, res) => {
    const queryString = 'insert into location values (?,?,?,?)';
    const data = req.body;
    var params = [data.locationId,data.name,data.country,data.description];
    mysqlConnection.query(queryString,params, (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
        console.log("succeed to set location");
        res.send(result);
        // res.redirect('/');
        }
    })
});

module.exports = router;
  