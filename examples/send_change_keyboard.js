const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const keyboard = [
  [{command: "1.1", text: "button 7"}, {command: "1.2", text: "button 9"}],
]

bot.changeKeyboard(to, keyboard).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);