const port = process.env.PORT || 8080;;
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port,() => {
    console.log(`Server running on localhost:${port}/`);
});


app.post("/insert", function(req, res) {
    var user_name=req.query.user;
    var password=req.query.password;
    console.log("in insert!");
    res.send('this is insert! \n your username is:'+user_name+'\n your password is:'+password);
});

app.get("/get", function(req, res) {
    console.log("in get!");
    res.send('this is get!');
});

app.get('/sample', function(req, res) {
    console.log("in sample!");
    res.send('this is a sample!');
});
