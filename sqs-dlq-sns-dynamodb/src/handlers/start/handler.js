'use strict';

const uuid = require('uuid/v4');

const action_type = 'start';
const Action = require('../../utils/action.util');
const action = new Action(action_type);

const Joi = require('@hapi/joi');
const schema = Joi.object({ id: Joi.string().required() }).unknown().required();

const SQS = require('aws-sdk/clients/sqs');
const SQSClient = require('../../commons/sqs.aws');
const sqs = new SQSClient(SQS, process.env.QUEUE_PUSHER_URL);

const { success, error, badRequest } = require('../../utils/response.util');

module.exports.start = async (event) => {
	const id = uuid();
	try {
		action.init(id);

		const body = JSON.parse(event.body);

		await schema.validateAsync(body, { abortEarly: false });

		const newEvent = {
			id: id,
			createdAt: new Date().toISOString()
		};

		await sqs.send(newEvent);

		action.success(id);

		return success({ id });
	} catch (err) {
		action.fail(id, err.message);
		if (err.name === 'ValidationError') return badRequest(err.message);
		return error(err.message);
	}
};
