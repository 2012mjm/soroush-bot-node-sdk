const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "HtAWSaNaCNw7VnlPrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const fileUrl = "GrAsMSI1kgbGrza8O..."; // received file url from server
const imageWidth = 600;
const imageHeight = 600;

// Optional
const options = {
  caption: "Caption for this gif"
  // fileName,
  // thumbnailUrl,
  // fileSize,
  // keyboard
};

bot.sendGifUploaded(to, fileUrl, imageWidth, imageHeight, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
