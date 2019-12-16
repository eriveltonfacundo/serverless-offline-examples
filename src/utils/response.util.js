'use strict';

const withStatusCode = (statusCode, formatter = JSON.stringify) => {
	return (data = null) => {
		const response = { statusCode: statusCode };
		if (statusCode === 400) data = { errors: data.replace(new RegExp('"', 'g'), '').split('. ') };
		if (statusCode === 500) data = { errors: [ data ] };
		if (data) response.body = formatter(data, null, 2);
		return response;
	};
};
module.exports = {
	success: withStatusCode(200),
	badRequest: withStatusCode(400),
	notFound: withStatusCode(404),
	conflit: withStatusCode(409),
	error: withStatusCode(500)
};
