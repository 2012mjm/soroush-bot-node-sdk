const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const text = "Your text with keyboard";
const keyboard = [
  [{command: "1.1", text: "button 1"}, {command: "1.2", text: "button 2"}],
  [{command: "2.1", text: "button 3"}, {command: "2.2", text: "button 4"}, {command: "2.3", text: "button 5"}],
]

bot.sendText(to, text, keyboard).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);