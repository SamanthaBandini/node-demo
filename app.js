const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
	res.send(process.env);
	});
app.listen (port, function(){
	console.log('Server is running on port '+ port)
	});