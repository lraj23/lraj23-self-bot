import bolt from "@slack/bolt";
import http from "http";
const { App } = bolt;

const startTime = Date.now();

const isSocketMode = (process.env.LRAJ23_BOT_SOCKET_MODE === "true"); // only true in development
const app = new App({
	"token": process.env.LRAJ23_BOT_BOT_TOKEN,
	"signingSecret": process.env.LRAJ23_BOT_SIGNING_SECRET,
	"socketMode": isSocketMode,
	"appToken": process.env.LRAJ23_BOT_APP_TOKEN,
});

console.log(isSocketMode ? "Starting in Socket Mode!" : "Starting in Request URL Mode!");

await app.start(process.env.LRAJ23_BOT_PORT || 5040);
console.log("⚡ Slack bot ready in " + (Date.now() - startTime) + "ms.");

// const server = http.createServer((req, res) => {
// 	console.log(req);

// 	res.writeHead(200, {
// 		"Content-Type": "text/plain"
// 	});
// 	res.end(req);
// });

// server.listen(3030, () => {
// 	console.log('Server running at http://localhost:3030/');
// });


export default app