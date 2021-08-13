const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const cors = require('cors');
app.use(cors());

const port = 3002;




app.use('/css',express.static(__dirname+'/build/css'))
app.use('/js',express.static(__dirname+'/build/js'))
app.use('/imgs',express.static(__dirname+'/build/imgs'))


app.get("/", function(req, res) {
  res.sendFile(__dirname+'/build/index.html');
});


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})