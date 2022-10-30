module.exports = {
	buildSuccessResponse(payload) {
		const response = {
			statusCode: 200,
			body: JSON.stringify(payload),
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				'X-Content-Type-Options': 'nosniff',
				'X-XSS-Protection': '1; mode=block',
				'X-Frame-Options': 'SAMEORIGIN',
				'Referrer-Policy': 'no-referrer-when-downgrade',
				'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
			}
		};
		return response;
	},

	buildErrorResponse(error) {
		const payload = { message: error.message ? error.message : ['Hubo un error interno'] };
		const response = {
			statusCode: error.code || 500,
			body: JSON.stringify(payload),
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			}
		};
		return response;
	},

	// buildAuthorizerResponse(message = 'No Autorizado' ) {
	//     const payload = { message };
	//     const response = {
	//         statusCode: 401,
	//         body: JSON.stringify(payload),
	//         headers: {
	//             'Access-Control-Allow-Origin': '*',
	//             'Access-Control-Allow-Credentials': true,
	//         },
	//     };
	//     return response;
	// },

	getAuthorization(event) {
		const authorization = event.headers ? event.headers.Authorization : null;
		return authorization;
	},

	getPayload(event) {
		let payload = event;
		if (event.pathParameters) {
			payload = event.pathParameters;
		} else if (event.body) {
			try {
				payload = JSON.parse(event.body);
			} catch (error) {
				payload = event.body;
			}
		}
		return payload;
	}
};
