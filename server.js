var express = require('express');
var app = express();

app.get('/api/v1/color', function (req, res) {
   var color = "#0000FF"
   var host = process.env.HOSTNAME
   
   if (host.match("green")) {
    color = "#00FF00"
   } else if (host.match("red")) {
    color = "#FF000"
   }

   var result = {"hostname": process.env.HOSTNAME, "color": color}
   console.log(result)

   res.end(JSON.stringify(result))
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})