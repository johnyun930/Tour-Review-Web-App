const express = require("express");
const router = express.Router();
const mysqlConnection = require('../connection.js');


//get all user information
router.get('/user', (req, res) => {
  const queryString = 'select * from siteuser';
  mysqlConnection.query(queryString, (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("sucess to get user's information");
      res.send(result);
    }
  })
});

//get user information
router.get('/user/:id', (req, res) => {
    const queryString = 'select * from siteuser where userid = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
      if(err){
        console.log(err);
      } else {
        console.log("sucess to get user's information");
        res.send(result);
      }
    })
});

//get all location information
router.get('/location', (req, res) => {
  const queryString = 'select * from location';
  mysqlConnection.query(queryString, (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("sucess to get location's information");
      res.send(result);
    }
  })
});

//get location information
router.get('/location/:id', (req, res) => {
    const queryString = 'select * from location where locationid = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
      if(err){
        console.log(err);
      } else {
        console.log("sucess to get location information");
        res.send(result);
      }
    })
});

//get all review information
router.get('/review', (req, res) => {
  const queryString = 'select * from review order by createdDate desc';
  mysqlConnection.query(queryString, (err, result, fields) => {
    if(err){
      console.log(err);
    } else {
      console.log("sucess to get all review");
      res.send(result);
    }
  })
});

//get specific user's review
router.get('/review/user/:id', (req, res) => {
    const queryString = 'select * from review where userid = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
      if(err){
        console.log(err);
      } else {
        console.log("sucess to get specific user's review");
        res.send(result);
      }
    })
});

//get reviews in specific location
router.get('/review/location/:id', (req, res) => {
    const queryString = 'select * from review where locationid = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
      if(err){
        console.log(err);
      } else {
        console.log("sucess to get specific location's review");
        res.send(result);
      }
    })
});

//get comment of one specific review 
router.get('/comment/review/:id', (req, res) => {
    const queryString = 'select * from comment where reviewId = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
        console.log("success to get comments about specific review");
        res.send(result);
        }
    })
});

//get comments of specific user
router.get('/comment/user/:id', (req, res) => {
    const queryString = 'select * from comment where userId = ?';
    mysqlConnection.query(queryString, [req.params.id], (err, result, fields) => {
        if(err){
        console.log(err);
        } else {
        console.log("success to get comments of specific user");
        res.send(result);
        }
    })
});

module.exports = router;