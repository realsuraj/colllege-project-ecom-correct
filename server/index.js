const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyParse = require('body-parser');

app.use(bodyParse.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecomdb'
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('db connect successfully');
    else
        console.log('connection failed \n' + JSON.stringify(err, undefined, 2));
});
app.listen(3000, () => console.log('express server is running at port no 3000'));

//actual start 
app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;


    mysqlConnection.query("INSERT INTO users (userName, password) VALUES (?,?)",[username,password], (err,result,field) => {
     if(err)
    res.send(err);
    else
    res.send({message: "Success"})
     
 });
})


app.post('/login' , (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    mysqlConnection.query("SELECT * FROM users WHERE userName = ? AND password = ?", 
    [username,password],
    (err,result) => {
        if(err)
            console.log({err: err})
        else
            {
                if(result.length > 0)
                    res.send({message: "Success"})
                else
                    res.send({message: "No User Found"})
            }
    } )

})