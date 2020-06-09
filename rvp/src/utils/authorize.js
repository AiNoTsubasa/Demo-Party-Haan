const jwt = require('jsonwebtoken');
const fs = require('fs');
const HttpStatus = require('../config/HttpStatus');

const authorization = (req, res, next) => {

	const httpStatus = new HttpStatus();
	
	const auth = req.headers['authorization'];
	if( auth === undefined ) {
		return res.status(httpStatus.unauthorized.status).json(httpStatus.unauthorized);
	}

	const token = req.headers['authorization'].split(' ')[1];
	if( token === undefined || token.length === 0 ) {
		return res.status(httpStatus.unauthorized.status).json(httpStatus.unauthorized);
	}

	const privateKey = fs.readFileSync(`${__dirname}/../config/private.key`);
	jwt.verify(token, privateKey, function(err, decoded) {
		if( err ) {
			return res.status(httpStatus.unauthorized.status).json(httpStatus.unauthorized);
		}

		if( decoded.role === undefined ) {
			return res.status(httpStatus.forbidden.status).json(httpStatus.forbidden);
		}

		next();
	});
	
};

module.exports = authorization;