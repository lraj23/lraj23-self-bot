const blocks = {};

blocks.warn = msg => [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text: msg
		},
		accessory: {
			type: "button",
			text: {
				type: "plain_text",
				text: "Close"
			},
			action_id: "cancel"
		}
	}
];

export {
	blocks
};