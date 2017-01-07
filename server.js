/*jshint esversion:6*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

let buzzWords = [];
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function( req, res, next) {
  console.log('Do you even app level bro?');
  next();
});

app.get('/', ( req, res, next ) => {
  res.sendFile(__dirname + '/public/index.html');
  });

app.get('/buzzwords', ( req, res, next ) => {
  res.send(buzzWords);
});

app.post('/buzzword', ( req, res, next ) => {
  buzzWords.push(req.body);
  res.send( '{ "success": true } ');
});

app.put('/buzzword', (req, res, next)=> {
  for(let i = 0; i < buzzWords.length; i++){
    if (req.body.buzzWord === buzzWords[i].buzzWord){
      let pointsValue = parseInt(buzzWords[i].points);
      let reqNewPoints = parseInt(req.body.points);
      buzzWords[i].points = pointsValue + reqNewPoints;
      buzzWords[i].heard = true;
      res.send({'success': true,'newScore': buzzWords[i].points});
    }
  }
});

app.listen(3000, function(server,  port) {
  console.log("let's get this party started");
});