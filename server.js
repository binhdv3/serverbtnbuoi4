var http = require('http');
var fs = require('fs');
var formidable = require('formidable');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// app.listen(8000, () => {
//     console.log('create suceccfully');
// });

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/", (req, res) => {
//     res.end();
// });


http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath;
            var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);