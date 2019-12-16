'use strict';

class SQSClient {
	constructor(SQS, url, formatter = JSON.stringify) {
		this._sqs = new SQS();
		this._url = url;
		this._formatter = formatter;
	}
	async send(event) {
		return await this._sqs
			.sendMessage({
				MessageBody: this._formatter(event),
				QueueUrl: this._url
			})
			.promise();
	}
}
module.exports = SQSClient;
