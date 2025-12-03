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
const postMessage = async message => {
	try {
		await app.client.chat.postMessage(message);
	} catch (e) {
		const { data: { error } } = e;
		console.error(error);
		if (error === "channel_not_found") {
			console.log("not in private channel <#" + message.channel + ">");
			try {
				await app.client.conversations.invite({
					token,
					channel: message.channel,
					users: lraj23BotUserId
				});
				await postMessage(message);
			} catch (err) {
				console.error(err);
			}
		} else if (error === "invalid_blocks") {
			await postMessage({
				channel: message.channel,
				token: message.token,
				thread_ts: message.thread_ts,
				text: disclaimer + "_This message was left blank..._"
			});
		} else await postMessage({
			channel: message.channel,
			token: message.token,
			thread_ts: message.thread_ts,
			text: disclaimer + "_There was an error..._"
		});
	}
};
const sendAslraj23 = async (message, type, respond) => {
	switch (type) {
		case "message":
			await postMessage({ ...message, token });
			break;
		case "ephemeral":
			await app.client.chat.postEphemeral({ ...message, token });
			break;
		case "respond":
			if (typeof message === "string") await respond({ text: message, token });
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
	await postMessage({
		channel,
		username: "lraj23 Welcomer",
		icon_emoji: "transparent",
		text: "<@" + lraj23UserId + "> ^^"
	});
	await sendAslraj23({
		channel,
		user,
		text: disclaimer + "What brings you here?",
		blocks: blocks.welcomer
	}, "ephemeral");
});

app.action(/^welcomer-.+$/, async ({ ack, action: { value }, body: { user: { id: user }, channel: { id: channel } }, respond }) => {
	await ack();
	console.log(user, channel, value);
	await sendAslraj23({
		channel,
		text: disclaimer + "><@" + user + "> clicked " + ["\"You invited me!\"", "\"Saw this somewhere\"", "\"Looking for channels...\"", "\"Other\""][["invited", "sawthis", "searching", "other"].indexOf(value)]
	}, "message");
	await sendAslraj23("Thanks for responding!", "respond", respond);
});

// @channel and @here pinging
app.message(/@(channel|here)/, async ({ message: { channel, user, thread_ts, ts, text } }) => {
	if (user !== lraj23UserId) return;
	if (text.includes("\\@channel") || text.includes("\\@here")) return await sendAslraj23({
		channel,
		user,
		text: "Your ping was escaped!"
	}, "ephemeral");
	await app.client.chat.delete({ token, channel, ts });
	await sendAslraj23({
		channel,
		text: "A ping was run by <@" + user + ">",
		blocks: blocks.channelHerePing(text),
		thread_ts
	}, "message");
});

// message with /echo
app.message("/echo", async ({ message: { channel, user, thread_ts, ts, text } }) => {
	if (user !== lraj23UserId) return;
	if (text.includes("\\/echo")) return await sendAslraj23({
		channel,
		user,
		text: "Your /echo was escaped!"
	}, "ephemeral");
	await app.client.chat.delete({ token, channel, ts });
	await (text.includes("--as-self") ? sendAslraj23 : postMessage)({
		channel,
		text: "An echo was run by <@" + user + ">",
		blocks: blocks.echo(text),
		thread_ts
	}, "message");
});

// // add emoji with /add-emoji
// app.message("/add-emoji", async ({ message }) => {
// 	const { channel, user, thread_ts, ts, text } = message;
// 	if (user !== lraj23UserId) return;
// 	if (text.includes("\\/add-emoji")) return await sendAslraj23({
// 		channel,
// 		user,
// 		text: "Your /add-emoji was escaped!"
// 	}, "ephemeral");
// 	console.log(message.files);
// 	// if (!message.files) return await postMessage({
// 	// 	channel,
// 	// 	text: "Could not add emoji since image was not attached..."
// 	// });
// 	// await app.client.chat.delete({ token, channel, ts });
// 	const emojiName = text.split("/add-emoji")[0].trim();

// 	// const form = new FormData();
// 	// form.append("token", process.env.LRAJ23_BOT_XOXC_TOKEN);
// 	// form.append("mode", "data");
// 	// form.append("name", emojiName);

// 	// let imgBuffer = await fetch(message.files[0].url_private).then(res => res.blob());
// 	// console.log(imgBuffer);

// 	// const blob = new Blob([imgBuffer], { type: "image/png" });
// 	// console.log(blob);

// 	// form.append("image", blob);

// 	try {
// 		// fetch("https://hackclub.enterprise.slack.com/api/emoji.add", {
// 		// 	method: "POST",
// 		// 	headers: {
// 		// 		Cookie: "d=" + process.env.LRAJ23_BOT_XOXD_TOKEN
// 		// 	},
// 		// 	// body: form,
// 		// 	body: {
// 		// 		token: process.env.LRAJ23_BOT_XOXC_TOKEN,
// 		// 		name: emojiName,
// 		// 		mode: "data",
// 		// 		image: blob
// 		// 	}
// 		// 	// data: {
// 		// 	// 	token: process.env.LRAJ23_BOT_XOXC_TOKEN,
// 		// 	// 	name: emojiName,
// 		// 	// 	mode: "data",
// 		// 	// 	image: imgBuffer
// 		// 	// }
// 		// }).then(async res => {
// 		// 	console.log("finished successfully", res);
// 		fetch("https://hackclub.enterprise.slack.com/api/emoji.add", {
// 			headers: {
// 				Cookie: "d=" + process.env.LRAJ23_BOT_XOXD_TOKEN
// 			},
// 			data: {
// 				token: process.env.LRAJ23_BOT_XOXC_TOKEN,
// 				name: emojiName,
// 				mode: "url",
// 				url: "https://avatars.slack-edge.com/2025-11-25/9994252166806_fe73c6ff1a813e655959_512.png"
// 			}
// 		});
// 		await postMessage({
// 			channel,
// 			text: "Added new emoji: :" + emojiName + ":"
// 		});
// 		// }).catch(err => {
// 		// 	console.log("failed successfully", err);
// 		// });

// 		// requests.post('https://hackclub.enterprise.slack.com/api/emoji.add',headers={'Cookie':'d=xoxd-...'},data={'token':'xoxc-...','name':'testing','mode':'url','url':'https://files.slack.com/files-pri/T09V59WQY1E-F09KY9DU1V4/test.gif?pub_secret=3ce4149c2e'})
// 	} catch (e) {
// 		console.error(e);
// 	}
// });

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

app.action("button_click", async ({ body: { channel: { id: channel }, user: { id: user }, container: { thread_ts } }, ack }) => [await ack(), await app.client.chat.postEphemeral({
	channel,
	user,
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