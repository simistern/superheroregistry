var express = require("express");
var app = express();
var r = require("rethinkdbdash")();

require("rethink-config")({
  "r": r,
  "database": "Twitterjobbot",
  "tables": ["superheroRegistry"]
});

app.use(express.static('./public'));

app.get('*', function(request, result){
  result.sendFile(__dirname + "/public/index.html");
})

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Your app listening port ' + PORT);
