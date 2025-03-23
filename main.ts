import { App, FileInstallationStore } from "@slack/bolt";
import { type } from "arktype";
import cron from "node-cron";
import fs from "node:fs";
import dotenv from "dotenv";
dotenv.config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    // installationStore: new FileInstallationStore()
})

const CronJob = type({
    cron: type.string.narrow(cron.validate),
    channel: "string",
    text: "string"
})

const CronJobArray = CronJob.array()

async function main() {
    app.message(async ({ message, say }) => {
        console.log(message)
    })

        //     channel:"#slack-bot-project",
    // 读取配置运行定时任务
    // const cronTableJsonStr = fs.readFileSync('cronTable.json', 'utf8')
    // const jobs = CronJobArray.assert(JSON.parse(cronTableJsonStr))
    // jobs.forEach(x=>{
    //     cron.schedule(x.cron, async () => {
    //         console.log(`[${currentTime}] Sending message to channel ${x.channel}`)
    //         try {
    //             const result = await web.chat.postMessage({
    //                 channel: x.channel,
    //                 text: x.text,
    //             });
    //             console.log(`Successfully send message ${result.ts} in conversation ${x.channel}`);
    //         } catch (error) {
    //             console.error(`Error posting message to ${x.channel}: ${error}`);
    //         }
    //     })
    // })
    // webClient.chat.postMessage({
    //     channel:"#slack-bot-project",
    //     // reply_broadcast:false,
    //     text:"hello world",
    //     // thread_ts:"1631087304.000100"
    // })
    await app.start(process.env.PORT || 3000);
    app.logger.info('⚡️ Bolt app is running!');
    app.client.chat.postMessage({
        channel: "#slack-bot-project",
        text: "hello world"
    })
}
main()