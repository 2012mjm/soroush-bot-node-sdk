const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "HtAWSaNaCNw7VnlPrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const fileUrl = "GrAsMSI1kgbGrza8O..."; // received file url from server
const fileName = "my_file.pdf";
const fileSize = 12 * 1024; // bytes

// Optional
const options = {
  caption: "Caption for this file"
  // keyboard
};

bot.sendFileUploaded(to, fileUrl, fileName, fileSize, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
