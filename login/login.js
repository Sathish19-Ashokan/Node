const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html')
})

app.get('/login', (req, res) => {
    const { user, pwd } = req.query;
    res.send(`UserName : ${user} Password: ${pwd}`)
})

app.listen(3000, () => {
    console.log("Port 3000 is Listening");
})