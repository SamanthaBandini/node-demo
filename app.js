
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//TODO: Change port for meraki
var portForMeraki = 9201;													//TCP listening port
var secret = "testmeraki";											//Secret that you chose in the Meraki dashboard
var validator = "VALIDATOR";			//Validator string that is shown in the Meraki dashboard

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

app.post('/meraki', function(req, res){ 
	try {
	  //var jsoned = JSON.parse(req.body);
	  //console.log("secret: "+req.body.secret+" sent by AP: "+req.body.data.apMac);
	  
		console.log("Request type: ");
		console.log(req.body.type);
	  if (req.body.secret == secret) {
		  console.log("secret OK. There are "+req.body.data.observations.length+" observations.");
		  for (i=0; i<req.body.data.observations.length; i++) {
			console.log("________________An observation:_____________________");
			console.log("clientMac: "+req.body.data.observations[i].clientMac);
			console.log("seenTime: "+req.body.data.observations[i].seenTime);
			console.log("ssid: "+req.body.data.observations[i].ssid);
			console.log("rssi: "+req.body.data.observations[i].rssi);
			console.log("location_____");
			if (req.body.data.observations[i].location != null){
				console.log("lat: "+req.body.data.observations[i].location.lat);
				console.log("lng: "+req.body.data.observations[i].location.lng);
				console.log("unc: "+req.body.data.observations[i].location.unc);
				console.log("x - length: "+ req.body.data.observations[i].location.x.length);
				for (f=0; f<req.body.data.observations[i].location.x.length; f++) {
					console.log("x ("+f+") :"+req.body.data.observations[i].location.x[f]);
				}
				console.log("y - length: "+ req.body.data.observations[i].location.y.length);
				for (fy=0; fy<req.body.data.observations[i].location.y.length; fy++) {
					console.log("y ("+fy+") :"+req.body.data.observations[i].location.y[fy]);
				}
			}
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
  	res.send('ok'); //CHANGE response 
  }
  
});

app.listen (port, function(){
	console.log('Server is running on port '+ port)
	});
