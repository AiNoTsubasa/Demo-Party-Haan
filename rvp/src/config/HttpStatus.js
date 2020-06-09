class HttpStatus {

	get success() {
    	return {
    		"status": 200,
            "message": "Success"
    	};
  	}

  	get created() {
    	return {
    		"status": 201,
            "message": "Created"
    	};
  	}

  	get accepted() {
    	return {
    		"status": 202,
            "message": "Accepted"
    	};
  	}

  	get noContent() {
    	return {
    		"status": 204,
            "message": "No Content"
    	};
  	}

  	get notModified() {
    	return {
    		"status": 304,
            "message": "Not Modified"
    	};
  	}

  	get badRequest() {
    	return {
    		"status": 400,
            "message": "Bad Request"
    	};
  	}

	get unauthorized() {
    	return {
    		"status": 401,
            "message": "Unauthorized"
    	};
  	}

	get forbidden() {
    	return {
    		"status": 403,
            "message": "Forbidden"
    	};
  	}

	get notFound() {
		return {
    		"status": 404,
            "message": "Not Found"
    	};
	}
}

module.exports = HttpStatus;