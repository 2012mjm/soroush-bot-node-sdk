const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const fileUrl = "GrAsMSI1kgbGrza8O..."; // received file url from server
const fileDuration = 30; // seconds

// Optional
const options = {
  caption: "Caption for this voice"
  // fileName,
  // fileSize,
  // keyboard
};

bot.sendVoiceUploaded(to, fileUrl, fileDuration, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
