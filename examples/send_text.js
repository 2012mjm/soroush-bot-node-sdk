const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN, false);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const text = "Your text";

bot.sendText(to, text).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
