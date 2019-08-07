import mongoose from 'mongoose'; 
import credit from '../models/creditModel.js';
var moment = require('moment');

exports.createCredit = (req, res) => {
	const newCredit = new credit(req.body);
	console.log(newCredit);
	let dateActual = moment()
	let dateEntry = moment(newCredit.dateEntry)
	let diffDates = dateActual.diff(dateEntry, 'months')
	if (diffDates > 18) {
		if (newCredit.salary > 800000) {
			if (newCredit.salary > 800000 && newCredit.salary < 1000000) {
				newCredit.valueCredit = 5000000
				newCredit.save((err, credit) => {
					if (err) {
						res.send(err);
					}
					var response = {
						status: { code: 200 },
						message: 'Credito creado satisfactoriamente. Se ha aprobado un crédito por $5.000.000',
					}
					res.json(response);
				});	
			}
			if (newCredit.salary > 1000000 && newCredit.salary < 4000000) {
				newCredit.valueCredit = 20000000
				newCredit.save((err, credit) => {
					if (err) {
						res.send(err);
					}
					var response = {
						status: { code: 200 },
						message: 'Credito creado satisfactoriamente. Se ha aprobado un crédito por $20.000.000',
					}
					res.json(response);
				});
			}
			if (newCredit.salary > 4000000) {
				newCredit.valueCredit = 50000000
				newCredit.save((err, credit) => {
					if (err) {
						res.send(err);
					}
					var response = {
						status: { code: 200 },
						message: 'Credito creado satisfactoriamente. Se ha aprobado un crédito por $50.000.000',
					}
					res.json(response);
				});
			}

		} else {
			var response = {
				status: { code: 500 },
				message: 'Su credito ha sido rechazado por el salario'
			}
			res.json(response);
		}

	} else {
		var response = {
				status: { code: 500 },
				message: 'No cumple con el tiempo trabajado en la compañia'
			}
			res.json(response);
	}
};