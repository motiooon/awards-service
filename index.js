var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var f = require('util').format,
    fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connection URL
var url = 'mongodb://172.23.250.207:27017/awards';

app.get('/', function(req, res){
  res.send('Hello! Nothing to see here.');
  MongoClient.connect(url, function(err, db) {
      console.log("Connected correctly to server",err, db);
    });
});

app.post('/nominations', function (req, res) {

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");

        // Insert a single document
        db.collection('nominations').insertOne(req.body, function(err, r) {
            res.send(r);
        });
    });

});

app.post('/votes', function (req, res) {

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");

        db.collection('votes').findOne({voter: req.body.voter}, function(err, r){
            console.log(err, r);

            if(!r){
                // Insert a single document
                db.collection('votes').insertOne(req.body.vote, function(err, r) {
                    res.send(r);
                });
            }else{
                res.send(400, 'already voted!');
            }
        });


    });

});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
});
