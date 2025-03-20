import { WebClient } from "@slack/web-api";
import { type } from "arktype";
import dotenv from "dotenv";
import fs from "fs"
import cron from "node-cron"
dotenv.config();
const web = new WebClient(process.env.SLACK_TOKEN);
console.log('Getting started with Node Slack SDK');

const CronJob = type({
    cron: type.string.narrow(cron.validate),
    channel: "string",
    text: "string"
})

const CronJobArray = CronJob.array()

const currentTime = new Date().toTimeString();
async function main() {
    // 读取配置运行定时任务
    const cronTableJsonStr = fs.readFileSync('cronTable.json', 'utf8')
    const jobs = CronJobArray.assert(JSON.parse(cronTableJsonStr))
    jobs.forEach(x=>{
        cron.schedule(x.cron, async () => {
            console.log(`[${currentTime}] Sending message to channel ${x.channel}`)
            try {
                const result = await web.chat.postMessage({
                    channel: x.channel,
                    text: x.text,
                });
                console.log(`Successfully send message ${result.ts} in conversation ${x.channel}`);
            } catch (error) {
                console.error(`Error posting message to ${x.channel}: ${error}`);
            }
        })
    })

}
main()