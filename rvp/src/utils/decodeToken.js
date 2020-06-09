const jwt = require('jsonwebtoken');
const fs = require('fs');
const HttpStatus = require('../config/HttpStatus');

const decodeToken = (req, res, next) => {
	const httpStatus = new HttpStatus();
	
	const token = req.params.token;
	
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

		return res.json(decoded);
	});
	
};

module.exports = decodeToken;