'use strict';

const action_type = 'pusher';

const Action = require('../../utils/action.util');
const action = new Action(action_type);

const SNS = require('aws-sdk/clients/sns');
const SNSClient = require('../../commons/sns.aws');
const sns = new SNSClient(SNS, process.env.TOPIC_PUSHER_ARN);

module.exports.pusher = async (event) => {
	const body = JSON.parse(event.Records[0].body);
	try {
		action.init(body.id);

		await sns.publish(body);

		action.success(body.id);
	} catch (err) {
		action.fail(body.id, err.message);
		throw err;
	}
};
