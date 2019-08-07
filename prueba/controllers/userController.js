import mongoose from 'mongoose'; 
import user from '../models/userModel.js';
var moment = require('moment');

exports.getUser = (req, res) => {
	user.findById(req.params.userId, (err, user) => {
		if (err) {
			res.send(err);
		}

		res.json(user);
	});
};

exports.getUserByIdentify = (req, res) => {
	var userIdentify = req.params.identify
	console.log(userIdentify)
	user.findOne({ identify : userIdentify }, (err, users) => {
		if (err) {
			res.send(err);
		}
		if (users !== null ) {
			var response = {
				status: { code: 200 },
				message: 'El usuario ya existe',
				user: users
			}
		res.json(response);
		} else {
			var response = {
				status: { code: 400 },
				message: 'El usuario no existe',
			}
		res.json(response);
		}
	})
};

exports.getAllUser = (req, res) => {
	user.find({}, (err, users) => {
		if (err) {
			res.send(err);
		}

		res.json(users);
	});
};

var findUser = function(identify, done) { //Check the database if User exists.
	user.findOne({ identify: identify }, (err, data) => {
		if (err) {
			done(err);
		}
		done(null, data);
	})
};

exports.createUser = (req, res) => {
	const newUser = new user(req.body);
	findUser(newUser.identify, function(err, data){
		if (err) {
			res.json(err);
		}

		if (data != null) { //If not null then user input is in database already.
			var response = {
				status: { code: 500},
				message: 'El usuario ya existe'
			}
			res.json(response);
		} else  {
			let yearBirthday = moment(newUser.birthday).year()
			let actualYear = moment().year()
			let diffYears = Number(actualYear) - Number(yearBirthday)
			if (diffYears >= 18 ) {
				newUser.save((err, user) => {
					if (err) {
						res.send(err);
					}
					var response = {
						status: { code: 200 },
						message: 'Usuario creado satisfactoriamente',
						user: user
					}
					res.json(response);
				});
			} else {
				var response = {
					status: { code: 500 },
					message: 'El usuario es menor de edad'
				}
				res.json(response);
			}
		}
	});
};

exports.updateUser = (req, res) => {
	user.findOneAndUpdate({
		_id: req.params.userId
	}, req.body,
	(err, user) => {
		if (err) {
			res.send(err);
		}

		res.json(user);
	});
};

exports.deleteUser = (req, res) => {
	user.remove({
		_id: req.params.userId
	}, (err) => {
		if (err) {
			res.send(err);
		}

		res.json({
			message: `user ${req.params.userId} successfully deleted`
		});
	});
};