const SoroushBot = require("../src/SoroushBot");

// For Active or Inactive Server Sent Events (SSE)
// You will not receive a message in Inactive mode
// Optional
const SSE = true;

const bot = new SoroushBot(process.env.BOT_TOKEN, SSE);

bot.onMessage = message => {
  console.log(
    `New message from ${message.from} \nType: ${message.type}\nBody: ${
      message.body
    }`
  );
};
