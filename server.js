var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
var fs=require("fs")
var bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true })); 
var save=[]
var xd={s:save,i:0}
var odt={s:save,i:0}
app.use(express.static('static')) // serwuje stronę index.html
//app.use(express.static('projekt/cwiczenia')) // serwuje pozostałe pliki, czyli ćwiczenia


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
    console.log(__dirname)
})
app.post('/zapisz', function(req, res) {
    console.log(req.body);
    save=req.body.objectData
    xd.s=save
    xd.i=req.body.b
    var a="zapisane"
    res.send(JSON.stringify(a));
  });
app.get('/wczytaj', function(req, res) {
    
    res.send(JSON.stringify(xd));
});
app.get('/dajGre', function(req, res) {
    
    res.send(JSON.stringify(odt));
});
app.get("/hex", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/hex.html"))
    console.log(__dirname)
})
app.get("/game", function (req, res) {
    console.log("lol")
    res.sendFile(path.join(__dirname + "/static/game.html"))
    console.log(__dirname)
})
app.post('/gra', function(req, res) {
    console.log(req.body);
    save=req.body.objectData
    odt.s=save
    odt.i=req.body.b
    var a="zapisane"
    res.send(JSON.stringify(a));
  });
app.listen(PORT, function () { 
    console.log("start serwera na " + PORT )
})


