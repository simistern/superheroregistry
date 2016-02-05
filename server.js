var express = require("express");
var app = express();
var r = require("rethinkdbdash")();

require("rethink-config")({
  "r": r,
  "database": "Twitterjobbot",
  "tables": ["superheroRegistry"]
});

app.use(express.static('./public'));

//GET Request for all items in superhero list table
app.get("/registry", function(req, res, next){
  r.db("Twitterjobbot").table("superheroRegistry").then(function(result){
    res.status(200).send(result);
  })
})

//POST request
app.post("/registry", function(req,res,next){
  r.db("Twitterjobbot").table("superheroRegistry").insert({
    "name" : req.body.supername,
    "power" : req.body.power,
    "date" : new Date()
  }).then(function(){
      res.status(200).send("Line Items uploaded to server")
    })
  })

app.get('*', function(request, result){
  result.sendFile(__dirname + "/public/index.html");
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Your app listening port ' + PORT);
