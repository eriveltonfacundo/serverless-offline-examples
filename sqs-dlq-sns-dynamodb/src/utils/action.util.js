'use strict';

const color_red = '\x1b[31m%s\x1b[0m';
const color_green = '\x1b[32m%s\x1b[0m';

class Action {
	constructor(actionType) {
		this._actionType = actionType;
	}
	init(transactionId, extras) {
		this._log(transactionId, 'started', extras);
	}
	success(transactionId, extras) {
		this._log(transactionId, 'succeeded', extras);
	}
	fail(transactionId, err, extras) {
		this._log(transactionId, 'failed', extras, err, color_red);
	}
	_log(transactionId, actionStatus, extras, err, color = color_green, timestamp = new Date()) {
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
