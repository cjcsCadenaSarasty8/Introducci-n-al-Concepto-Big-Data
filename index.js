var body_parser = require('body-parser');
var express = require('express');
var fs      = require('fs');
var app = express();

var json="";

app.use(express.static("cliente"));
app.use(body_parser.urlencoded({extended:true}));

app.post("/cargarwebcrawler",function(req,res){
    // var user=req.body.user || '';
    // var pass=req.body.pass || '';
    
    EscribirJson();
    LecturaJson();
    res.end("web crarler node");
  })

app.listen(3000, function () {
  console.log('Escuchando por el puerto 3000');
});

function EscribirJson(){
    json="hola que tal"
    fs.writeFile('webcrawler.json', JSON.stringify(json), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
    })
}
function LecturaJson(){
    fs.readFile('webcrawler.json', 'utf8', function(err, contents) {
        console.log(contents);
    });
}