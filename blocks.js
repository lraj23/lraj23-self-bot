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

blocks.markdown = text => [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text
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

blocks.echo = text => [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text: text.split("/echo").join("").split("--as-self").join("")
		}
	},
];

blocks.winter = statement => [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text: "The AI came up with this statement. Would you like to use it, or instead regenerate?\n" + statement
		}
	},
	{
		type: "actions",
		elements: [
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":x: Cancel",
					emoji: true
				},
				value: "cancel",
				action_id: "cancel"
			},
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":ai: Regenerate",
					emoji: true
				},
				value: "regenerate",
				action_id: "regenerate-winter"
			},
			{
				type: "button",
				text: {
					type: "plain_text",
					text: ":white_check_mark: Go!",
					emoji: true
				},
				value: "confirm",
				action_id: "confirm-winter"
			}
		]
	}
];

blocks.winterFinal = statement => [
	{
		type: "section",
		text: {
			type: "mrkdwn",
			text: statement
		}
	},
];

export {
	blocks
};