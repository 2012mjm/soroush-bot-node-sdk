const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const fileUrl = "GrAsMSI1kgbGrza8O..."; // received file url from server
const fileSavePath = "my_image.jpg"; // path to save the file

bot.downloadFile(fileUrl, fileSavePath).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);

// ################### OR ######################

// fileSavePath parameter is optional
// The function returns the download value
bot.downloadFile(fileUrl).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
