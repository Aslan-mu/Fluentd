"use strict"
const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const logger = require('fluent-logger');

logger.configure('fluentd.test', {
    host: '35.229.19.222',
    port: 24224,
    timeout: 3.0,
    reconnectInterval: 600000 // 10 minutes
}
);


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    logger.emit('local!',{'!':'!'});
    res.send('Hello World!');
});

app.get("/get", function(req, res) {
    logger.emit({'function' : 'get'});
    console.log("in get!");
    res.send('this is get!');
});

app.get('/sample', function(req, res) {
    logger.emit({'function' : 'sample'});
    console.log("in sample!");
    res.send('this is a sample!');
});


app.post("/insert", function(req, res) {
    var user_name=req.query.user;
    var password=req.query.password;
    logger.emit({'function' : 'insert'});
    console.log("in insert!");
    res.send('this is insert! \n your username is:'+user_name+'\n your password is:'+password);
});

//logger.emit({'server' : 'running'});

app.listen(port,() => {
    console.log(`Server running on localhost:${port}/`);
});
