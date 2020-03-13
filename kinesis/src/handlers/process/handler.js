'use strict';

module.exports.process = async (event) => {
	event.Records.forEach((record) => {
		console.log(Buffer.from(record.kinesis.data, 'base64').toString('ascii'));
	});
};
