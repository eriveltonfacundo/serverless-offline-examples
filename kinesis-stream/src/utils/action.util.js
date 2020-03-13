'use strict';

const color_red = '\x1b[31m%s\x1b[0m';
const color_green = '\x1b[32m%s\x1b[0m';
const color_blue = '\x1b[34m%s\x1b[0m';
const color_cyan = '\x1b[36m%s\x1b[0m';

class Action {
	constructor(actionType) {
		this._actionType = actionType;
	}
	init(transactionId, extras) {
		this._log(transactionId, 'started', extras, color_cyan);
	}
	success(transactionId, extras) {
		this._log(transactionId, 'succeeded', extras, color_green);
	}
	fail(transactionId, err, extras) {
		this._log(transactionId, 'failed', extras, color_red, err);
	}
	_log(transactionId, actionStatus, extras, color = color_blue, err, timestamp = new Date()) {
		return console.log(
			color,
			JSON.stringify({
				timestamp,
				action_type: this._actionType,
				action_status: actionStatus,
				transaction_id: transactionId,
				error: err,
				extras
			})
		);
	}
}
module.exports = Action;
