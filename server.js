var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configs = require('./lib/configs/configs');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

var io = require('socket.io')(app);

//Include Routes Here
var auth = require('./lib/routes/auth');

//Connect to mongoose DB 
mongoose.connect(configs.db.url);

app
	.use(express.static('./public'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(cookieParser())
	.use('api', auth)

	.get('*', function(req, res){
		res.sendfile('public/views/index.html');
	})

	.listen(port, function(){
		console.log('Server Running on port: ' + post);
	});
