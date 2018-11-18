const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

bot.onMessage = message => {
  console.log(
    `New message from ${message.from} \nType: ${message.type}\nBody: ${message.body}`
  );

  bot.sendText(message.from, "Your message receive").then(
    res => {
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
};