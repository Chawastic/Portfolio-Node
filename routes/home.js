var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Your GET route
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  res.render('home', { array: JSON.parse(data) });
});

// Your POST route
router.post('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  const newArray = array.concat([req.body.newText])
  fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(newArray));
  res.end();
});

// Your DELETE route
router.delete('/', jsonParser, function(req, res, next) {
  let textToDelete = req.body.textToDelete;
  if (!textToDelete) {
    return res.status(400).json({ error: "textToDelete is required" });
  }
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  array = array.filter(item => item !== textToDelete);
  fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(array));
  res.status(200).end();
});

module.exports = router;