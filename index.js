var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection URL
var url = 'mongodb://localhost:27017/awards';

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/nominations', function (req, res) {

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");

        // Insert a single document
        db.collection('nominations').insertOne(req.body.nomination, function(err, r) {
            res.send(r);
        });
    });

});

app.post('/votes', function (req, res) {

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");

        db.collection('votes').findOne({voter: req.body.vote.voter}, function(err, r){
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

