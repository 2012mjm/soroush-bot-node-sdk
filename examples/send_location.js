const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const latitude = 35.7448416;
const longitude = 51.3753212;

// Optional
const keyboard = {};

bot.sendLocation(to, latitude, longitude, keyboard).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
