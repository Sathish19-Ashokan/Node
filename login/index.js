const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log("Port 3000 is Listening");
});
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//const fetch = require('node-fetch');
//const fileUpload = require('express-fileupload');
app.set('json spaces', 2);
app.set("view engine", "ejs");
app.set(`${__dirname}/views`);


app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/login.html')
    res.sendFile(`${__dirname}/index.html`)
});

let user = new Array();
let pwd = new Array();
// let user = '';
// let pwd = '';
app.post('/login', (req, res) => {
    // let user;
    // let pwd;
    // user = req.body.user;
    // pwd = req.body.pwd;
    user.push(req.body.username);
    pwd.push(req.body.password);
    console.log(user);
    //console.log(pwd);
    res.json({ 'username': user, 'password': pwd });
});