var express = require('express')
	bodyParser = require('body-parser'),
	session = require('express-session'),
	crypto = require('crypto');

var router = express.Router(),
	Users = require('../models/users'),
	configs = require('../configs/configs');


function hash(password){
	return crypto.createHash('sha256').update(password).digest('hex');
}

router
	.use(bodyParser.urlencoded())
	.use(bodyParser.json())
	.use(session({ secret: configs.session.secret }))
	.use(function(req, res, next){
		if(req.session.uid){
			Users.findById(req.session.uid, function(err, user){
				req.user = user;
			});
		}

		next();
	})
	.post('/login', function(req, res){
		var user = {
			email: req.body.email,
			password: hash(req.body.password)
		};

		Users.findOne(user, function(err, user){
			if(err) return res.send(401, err);

			res.session.uid = user._id;
			res.json(user);
		});
	})
	.post('/signup', function(req, res){
		var user = new Users(req.body);

		user.password = hash(req.body.password);

		Users.find({ email: user.email }, function(err, user){
			if(!user.length){
				user.save(function(err){
					if(!err)
						res.json(user);
				});
			}
		});
	})
	.get('/logout', function(req, res){
		req.session.uid = null;
		res.send(200);
	});

module.exports = router;