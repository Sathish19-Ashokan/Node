const express = require('express');  
const app = express();
const path = require('path')
//app.use(express.static(`${__dirname}/public`));
app.use(express.static(__dirname));
//Serves all the request which includes /images in the url from Images folder
app.use('/uploads', express.static(`${__dirname}/uploads`));
//app.use(express.static(path.join(__dirname, 'public')));
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/addingFile.html`)
});

app.post('/login', (req, res) => {
    let sampleFile;
    let uploadPath;
    const baseUrl = "http://localhost:3000";

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send(`<h3>No Files is Selected for Uploading.</h3>
        <p>Please select a file to upload</p>
        <br><button onclick="history.go(-1)">
        BACK
    </button>`);
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = `${__dirname}/uploads/${sampleFile.name}`; //C:\Users\Admin\Desktop\VS HTML & CSS\Assignment2\login\public\uploads
    const path1 = `${baseUrl}/uploads/${sampleFile.name}`;  //http://localhost:3000/uploads/(uploadedfilename)
    //uploadPath = `${__dirname}/savedfile/${sampleFile.name}`;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
    })
    res.json({
        status: true,
        message: 'File is uploaded',
        data: {
            username: req.body.username,
            password: req.body.password,
            name: sampleFile.name,
            mimetype: sampleFile.mimetype,
            size: sampleFile.size,
            url: path1
        }
    });
})

app.listen(3000, () => {
    console.log("Port 3000 is Listening");
});