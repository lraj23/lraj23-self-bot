const blocks = {};
const lraj23BotUserId = "U09VDSCRBK6";
const disclaimer = "_Disclaimer: this message was sent through a bot (<@" + lraj23BotUserId + ">), so it may be automated and may not reflect my actual views or opinions..._\n";

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

blocks.welcomer = [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text: disclaimer + "What brings you here?"
		}
	},
	{
		type: "actions",
		elements: [
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":lraj23-picrew: You invited me!",
					emoji: true
				},
				value: "invited",
				action_id: "welcomer-invited"
			},
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":yay-binoculars: Saw this somewhere",
					emoji: true
				},
				value: "sawthis",
				action_id: "welcomer-sawthis"
			},
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":alibaba-search: Looking for channels...",
					emoji: true
				},
				value: "searching",
				action_id: "welcomer-searching"
			},
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":undefined: Other",
					emoji: true
				},
				value: "other",
				action_id: "welcomer-other"
			}
		]
	}
];

export {
	blocks
};