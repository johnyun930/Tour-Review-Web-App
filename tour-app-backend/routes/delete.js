const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection.js');

//Delete user information
router.delete('/user/:userid', (req, res) => {
  const queryString = 'delete from siteuser where userid = ?';
  mysqlConnection.query(queryString, [req.params.userid], (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("Delete user information success");
    res.redirect('/');
    }
  })
});

//Delete the reivew
router.delete('/review/:reviewid', (req, res) => {

  const queryString = 'delete from review where reviewId = ?';
  mysqlConnection.query(queryString, [req.params.reviewid], (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("Delete review success");
    res.redirect('/');
    }
  })
});

//delete comment
router.delete('/comment/:commentid', (req, res) => {
  const queryString = 'delete from comment where commentId = ?';
  mysqlConnection.query(queryString, [req.params.commentid], (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("Delete comment success");
      res.redirect('/');
    }
  })
});

//delete location
router.delete('/location/:locationid', (req, res) => {
  const queryString = 'delete from location where locationId = ?';
  // const id = parseInt(req.params.locationid, 10);
  mysqlConnection.query(queryString, [req.params.locationid], (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("Delete location success");
      res.redirect('/');
    }
  })
});

module.exports = router;