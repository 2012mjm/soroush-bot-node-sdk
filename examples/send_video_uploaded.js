const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const fileUrl = "GrAsMSI1kgbGrza8O..."; // received file url from server
const thumbnailUrl = "QrOt6J4oCbXBHt..."; // received file url from server
const thumbnailWidth = 600;
const thumbnailHeight = 600;
const fileDuration = 5 * 60; // seconds

// Optional
const options = {
  caption: "Caption for this video"
  // fileName,
  // fileSize,
  // keyboard
};

bot.sendVideoUploaded(to, fileUrl, fileDuration, thumbnailUrl, thumbnailWidth, thumbnailHeight, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
