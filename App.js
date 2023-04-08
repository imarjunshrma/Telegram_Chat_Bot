require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg.text,
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  //   console.log(msg.chat.id, msg.text);
  const res = response.data.choices[0].text;
  bot.sendMessage(msg.chat.id, res);
});
