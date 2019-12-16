'use strict';

const { DocumentClient } = require('aws-sdk/clients/dynamodb');
const { Events } = require('../../commons/event.repository');
const events = new Events(DocumentClient);

const { success, notFound } = require('../../utils/response.util');

module.exports.event = async () => {
	const items = await events.list();
	if (items && items.length) return success(items);
	return notFound();
};
