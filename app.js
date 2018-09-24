
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//TODO: Change port for meraki
var portForMeraki = 9201;													//TCP listening port
var secret = "testmeraki";											//Secret that you chose in the Meraki dashboard
var validator = "2521959f5342db521bab4454c1e839d121de38c0";			//Validator string that is shown in the Meraki dashboard

var port = process.env.PORT || 3000;

//parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send(process.env);
	});
	
app.get('/meraki', function(req, res){
  res.send(validator);
  console.log("sending validation")
});

//TODO: To be checked
app.post('/meraki', function(req, res){ 
	try {
	  var jsoned = JSON.parse(req.body.data);
	  if (jsoned.secret == secret) {
		  console.log(jsoned.probing);
		  for (i=0; i<jsoned.probing.length; i++) {
			  console.log("client " + jsoned.probing[i].client_mac + " seen on ap " + jsoned.probing[i].ap_mac + " with rssi " + jsoned.probing[i].rssi + " at " + jsoned.probing[i].last_seen);
		  }
	   } else {
		   console.log("invalid secret from  " + req.connection.remoteAddress);
	   }
	} catch (e) {
		// An error has occured, handle it, by e.g. logging it
  	console.log("Error.  Likely caused by an invalid POST from " + req.connection.remoteAddress + ":");
  	console.log(e);
	console.log("Request: ");
	console.log(req);
  	res.end();
  }
  
});

app.listen (port, function(){
	console.log('Server is running on port '+ port)
	});