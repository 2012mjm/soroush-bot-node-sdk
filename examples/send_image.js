const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const filePath = "my_image.jpg";

// Optional
const options = {
  caption: "Caption for this image"
  // fileName,
  // thumbnailUrl,
  // imageWidth,
  // imageHeight,
  // fileSize,
  // keyboard
};

bot.sendImage(to, filePath, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
