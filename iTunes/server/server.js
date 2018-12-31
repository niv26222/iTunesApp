const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const {getUsers,login,registration,deleteUser} = require('./mainServer.js');

var app = express();
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './../build')));

app.set('/static', path.join(__dirname, './../build/static'));

app.use('/*',express.static(path.join(__dirname, './../build')));

app.post('/api/login', function (req, res) {
  let user = req.body['user'];
  login(user,res);
});

app.post('/api/register', function (req, res) {
  let user = req.body['user'];
  registration(user,res);
});

app.post('/api/getUsers',(req,res)=>{
  getUsers(res);
});

app.post('/api/deleteUser', function (req, res) {
  let user = req.body;
  deleteUser(user,res);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))