/*jshint esversion:6*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

points = 0;

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
      buzzWords[i].heard = true;
      points += parseInt(buzzWords[i].points);
      res.send(`{'success': 'true', newScore: ${points}}`);
    }
  }
  res.send('{"success": false}');
});

app.delete('/buzzword', (req, res, next) =>{
  for(var i = 0; i < buzzWords.length; i++){
    if(buzzWords[i].buzzword === req.body.buzzword){
      buzzWords.splice(i, 1);
      res.send('{"success": true}');
    }
  }
  res.send('{"success": false');

});

app.post('/reset', function (req, res) {
  score = 0;
  buzzWords = [];
  res.send({"success": true});
});

app.listen(3000, function(server,  port) {
  console.log("let's get this party started");
});