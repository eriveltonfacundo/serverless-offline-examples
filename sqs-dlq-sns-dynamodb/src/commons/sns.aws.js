'use strict';

class SNSClient {
	constructor(SNS, topic, formatter = JSON.stringify) {
		this._sns = new SNS({ endpoint: process.env.SNS_URL });
		this._topic = topic;
		this._formatter = formatter;
	}
	async publish(event) {
		return await this._sns
			.publish({
				Message: this._formatter(event),
				TopicArn: this._topic
			})
			.promise();
	}
}
module.exports = SNSClient;
