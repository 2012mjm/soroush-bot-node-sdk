const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const filePath = "my_voice.m4a";
const fileDuration = 30; // seconds

// Optional
const options = {
  caption: "Caption for this voice"
  // fileName,
  // fileSize,
  // keyboard
};

bot.sendVoice(to, filePath, fileDuration, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
