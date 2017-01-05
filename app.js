/*jshint esversion:6*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

let buzzwordArr = {
  'buzzWords': []
};

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function( req, res, next) {
  console.log('Do you even app level bro?');
  next();
});

app.get('/', ( req, res, next ) => {
  res.sendFile(__dirname + '/public/index.html');
  });

app.get('/buzzwords', function( req, res, next ) {
  res.send(buzzwordArr);
});

app.post('/buzzword', function( req, res, next ) {
  buzzwordArr.buzzwords.push(req.body);
  res.send( '{ "success": true } ');
});

app.listen(3000, function(server,  port) {
  console.log('started');
});

//res.sendFile(__dirname + '/index.html')
//find out what this is