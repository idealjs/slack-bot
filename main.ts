import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
dotenv.config();
const web = new WebClient(process.env.SLACK_TOKEN);
console.log('Getting started with Node Slack SDK');

const currentTime = new Date().toTimeString();
async function main() {
    await web.chat.postMessage({
        channel: '#slack-bot-project',
        text: "下一步该做什么"
    })
}
main()