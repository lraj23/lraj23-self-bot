import app from "./client.js";
import { getlraj23, saveState } from "./datahandler.js";
import { blocks } from "./blocks.js";
const lraj23UserId = "U0947SL6AKB";
const lraj23BotTestingId = "C09GR27104V";
const lraj23sLavishLodgeId = "C09KUCDAXFE";
const lraj23sMezzanineId = "C09RMSA9L2K";
const lraj23BotUserId = "U09VDSCRBK6";
const token = process.env.LRAJ23_BOT_USER_TOKEN;
const disclaimer = "_Disclaimer: this message was sent through a bot (<@" + lraj23BotUserId + ">), so it may be automated and may not reflect my actual views or opinions..._\n";
const gPortfolioDmId = "D09SN86RFC1";
const commands = {};
const sendAslraj23 = async (message, type, respond) => {
	switch (type) {
		case "message":
			await app.client.chat.postMessage({ ...message, token });
			break;
		case "ephemeral":
			await app.client.chat.postEphemeral({ ...message, token });
			break;
		case "respond":
			if (typeof message === typeof typeof message) await respond({ text: message, token });
			else await respond({ ...message, token });
			break;
	}
};

app.message("", async ({ message: { text, channel, channel_type } }) => {
	if ((channel_type === "im") && (channel === gPortfolioDmId)) {
		const info = text.split(";");
		console.log(info[0], commands[info[0]]);
		return commands[info[0]]({
			ack: _ => _,
			body: {
				user_id: info[1],
				channel_id: info[2]
			},
			respond: (response) => {
				if (typeof response === "string") return app.client.chat.postEphemeral({
					channel: info[2],
					user: info[1],
					text: response
				});
				if (!response.channel) response.channel = info[2];
				if (!response.user) response.user = info[1];
				app.client.chat.postEphemeral(response);
			}
		});
	}
});

// Channel welcomer for #lraj23-bot-testing, #lraj23s-lavish-abode, and #lraj23s-mezzanine
app.event("member_joined_channel", async ({ event: { user, channel } }) => {
	if (![lraj23BotTestingId, lraj23sLavishLodgeId, lraj23sMezzanineId].includes(channel)) return;
	console.log("member joined channel: <@" + user + "> joined <#" + channel + ">");
	await sendAslraj23({
		channel,
		text: disclaimer + "Hi there <@" + user + ">! Welcome to <#" + channel + ">! In this channel, <@" + lraj23UserId + "> " + ["tests his bots, including but not limited to:\n\t:chess-emojis: Chess Emojis;\n\t:competitive-chess-emojis: Competitive Chess Emojis;\n\t:magical-chess-emojis: Magical Chess Emojis;\n\t:secret-signal-service: Secret Signal Service;\n\t:you-must-be-active: You-must-be-active Manager;\n\t:count-draqula: Count Draqula;\n\t:grid-portfolio: Grid Portfolio;\n\t:folding-paper: Folding Paper;\n\t:tone-tag-framework: Tone Tag Framework; and\n\t:lraj23-self-bot: lraj23 Self Bot (this bot!!).", "talks about random things, but only when people are active. :shrug3d: Not a lot goes on in here I guess, so you can try to make it active!", "literally doesn't do anything. Idk why this place exists anymore... :pensive-wobble:"][[lraj23BotTestingId, lraj23sLavishLodgeId, lraj23sMezzanineId].indexOf(channel)]
	}, "message");
});

app.action(/^ignore-.+$/, async ({ ack }) => await ack());

app.action("cancel", async ({ ack, respond }) => [await ack(), await respond({ delete_original: true })]);

app.action("confirm", async ({ ack }) => await ack());

commands.help = async ({ ack, respond, body: { user_id } }) => [await ack(), await respond("This is the lraj23 Self Bot! It represents <@" + lraj23UserId + "> in various occasions for various reasons. _More information to be added..._\nFor more information, check out the readme at https://github.com/lraj23/lraj23-self-bot."), user_id === lraj23UserId ? await respond("Test but only for <@" + lraj23UserId + ">. If you aren't him and you see this message, DM him IMMEDIATELY about this!") : null];
app.command("/lraj23-help", commands.help);

app.message(/secret button/i, async ({ message: { channel, user, thread_ts, ts } }) => await app.client.chat.postEphemeral({
	channel, user,
	text: "<@" + user + "> mentioned the secret button! Here it is:",
	thread_ts: ((thread_ts == ts) ? undefined : thread_ts),
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "<@" + user + "> mentioned the secret button! Here it is:"
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Secret Button"
					},
					action_id: "button_click"
				}
			]
		}
	]
}));

app.action("button_click", async ({ body: { channel: { id: cId }, user: { id: uId }, container: { thread_ts } }, ack }) => [await ack(), await app.client.chat.postEphemeral({
	channel: cId,
	user: uId,
	text: "You found the secret button. Here it is again.",
	thread_ts,
	blocks: [
		{
			type: "section",
			text: {
				type: "mrkdwn",
				text: "You found the secret button. Here it is again."
			}
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: "Secret Button"
					},
					action_id: "button_click"
				}
			]
		}
	]
})]);