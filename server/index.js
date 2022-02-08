const mysql = require('mysql');
const express = require('express');
const multer = require('multer');
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

 //var for image picked orignal name
 let img_name;  

 //making access to public 

 app.use(express.static('public'))
 app.use('/uploads',express.static('uploads'))

//multer storage

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        img_name = file.originalname;
        callBack(null, `ProductImage_${file.originalname}`)

    }
  })

 
  
const upload = multer({ storage: storage })

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

app.post('/adminlogin' , (req,res) => {

    mysqlConnection.query('SELECT * FROM adminlogin WHERE admin_username = ? AND admin_password = ?', 
    [req.body.username, req.body.password],
    (err,result) => {
        if(err) console.log(err);
        else
            {
                if(result.length > 0)
                    res.send({message: "Success_login"})
                else
                    res.send({message: "No User Found"})
            }
    })

})

app.post('/AddProduct' , (req,res)=> {
    product_name = req.body.productName
    product_price = req.body.productPrice
    product_description = req.body.productDescription
    product_discount = req.body.productDiscount
    product_image_location = img_name

    mysqlConnection.query('INSERT into products (product_name,product_price,product_description,product_discount,product_image_location) VALUES (?,?,?,?,?)',
    [product_name,product_price,product_description,product_discount,product_image_location], (err,result) => {
        if(!err) {
            res.send({message: "insert_successfully"})
            console.log("No error")
        }
        else console.log(err)
    })
} )

app.post('/addProductImage', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

  app.get('/products',(req,res) => {
      mysqlConnection.query('SELECT * from products',(err,rows,fields) => {
          if(!err){
              console.log(rows)
              res.send(rows)
          }
          else{
              console.log(err)
          }
      })
  })