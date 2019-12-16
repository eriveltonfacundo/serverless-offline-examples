'use strict';

const action_type = 'saver';

const Action = require('../../utils/action.util');
const action = new Action(action_type);

const DynamodbClient = require('aws-sdk/clients/dynamodb');
const Repository = require('../../commons/event.repository');
const repository = new Repository(DynamodbClient);

module.exports.saver = async (event) => {
	const body = JSON.parse(event.Records[0].Sns.Message);
	try {
		action.init(body.id);

		await repository.create(body);

		action.success(body.id);
	} catch (err) {
		action.fail(body.id, err.message);
		throw err;
	}
};
