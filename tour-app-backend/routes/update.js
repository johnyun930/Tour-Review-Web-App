const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection.js');

//Update the review
router.post('/review', (req, res) => {
    const queryString = `Update review SET createdDate = ?,reviewDescription = ?, rating = ?, userId = ?, locationId = ? WHERE reviewId=?`; 
    const data = req.body;
    var params = [data.createDate,data.reviewDescription,data.rating,data.userId,data.locationId,data.reviewId];
    mysqlConnection.query(queryString,params, (err, result, fields) => {
      if(err){
        console.log(err);
      } else {
        console.log("succeed to edit review");
        res.redirect('/');
      }
    })
});
  
//update the comment
router.post('/comment', (req, res) => {
  const queryString = `Update comment SET createdDate = ?,comment = ? WHERE commentId = ? `;
  const data = req.body;
  var params = [data.createdDate,data.comment,data.commentId];
  mysqlConnection.query(queryString,params, (err, result, fields) => {
      if(err){
      console.log(err);
      } else {
      console.log("succeed to eidt comment");
      res.redirect('/');
      }
  })
});
  
//update location
router.post('/location', (req, res) => {
    const queryString = `Update location SET name = ?,country = ?, description = ? WHERE locationId = ? `; 
    const data = req.body;
    var params = [data.name,data.country,data.description,data.locationId];
    mysqlConnection.query(queryString,params, (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
        console.log("succeed to edit location");
        res.redirect('/');
        }
    })
});

//Update the user
router.put('/user/:userId', (req, res) => {
  const queryString = `Update siteuser SET username = ?,password = ?, photo = ?, profile = ?, firstName = ?, lastName = ?, email = ?, phoneNum = ? WHERE userId=?`; 
  const data = req.body;
  var params = [data.username,data.password,data.photo,data.profile,
    data.firstName,data.lastName,data.email,data.phoneNum, req.params.userId];  
  mysqlConnection.query(queryString,params, (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("succeed to edit user");
      res.sendStatus(200);
    }
  })
});

  
module.exports = router;
