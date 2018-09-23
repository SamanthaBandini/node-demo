
var express = require('express');
var app = express();

var port = 9201;													//TCP listening port
var secret = "testmeraki";											//Secret that you chose in the Meraki dashboard
var validator = "2521959f5342db521bab4454c1e839d121de38c0";			//Validator string that is shown in the Meraki dashboard

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.send(process.env);
	});
	
app.get('/meraki', function(req, res){
  res.send(validator);
  console.log("sending validation")
});

app.listen (port, function(){
	console.log('Server is running on port '+ port)
	});