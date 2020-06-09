const path = require('path');
const HttpStatus = require('../config/HttpStatus');

const handleFileRequest = (req, res, next) => {

	const httpStatus = new HttpStatus();

	const fileName = req.params.fileName;
    if( fileName.length > 0 ) {
        return res.sendFile(path.resolve(`${__dirname}/../../../uploads/${fileName}`));
    } else {
		return res.status(httpStatus.notFound.status).json(httpStatus.notFound);
	}
	
};

module.exports = handleFileRequest;