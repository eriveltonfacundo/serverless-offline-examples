'use strict';

class Repository {
	constructor(DynamodbClient) {
		this._documentClient = new DynamodbClient.DocumentClient({ endpoint: process.env.DYNAMODB_URL });
		this._tableName = { TableName: process.env.DYNAMODB_TABLE_EVENTS };
	}

	async list() {
		const params = this._createParamObject();
		const response = await this._documentClient.scan(params).promise();
		return response.Items;
	}

	async create(event) {
		await this._documentClient.put(this._createParamObject({ Item: event })).promise();
	}

	_createParamObject(additionalArgs = {}) {
		return Object.assign({}, this._tableName, additionalArgs);
	}
}

module.exports = Repository;
