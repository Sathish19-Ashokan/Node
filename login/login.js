const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

app.use(fileUpload());

app.set("view engine", "ejs");
app.set(`${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/login.html`);
});

let user = new Array();
let pwd = new Array();
let uploaded = 0;
let check = 0;
app.post('/login', (req, res) => {

    user.push(req.body.user);
    pwd.push(req.body.pwd);
    //const pwd = req.body.pwd;
    let sampleFile;
    let uploadPath;
    

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    else{
        uploaded++;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = `${__dirname}/uploaded/${sampleFile.name}`;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err){
            return res.status(500).send(err);
        }
    });
    let isuploaded = (uploaded > check) ? true : false;
    res.render("index", { user, pwd, isuploaded, uploaded });
    check++;
})

app.listen(3000, () => {
    console.log("Port 3000 is Listening");
});