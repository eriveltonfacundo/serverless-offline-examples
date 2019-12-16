'use strict';

module.exports.pusher = async (event) => {
	console.log('Event:', event.Records[0].body);
};
