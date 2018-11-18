const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const videoPath = "my_video.mp4";
const thumbnailPath = "my_thumb.jpg";
const fileDuration = 5 * 60; // seconds

// Optional
const options = {
  caption: "Caption for this video"
  // fileName,
  // thumbnailWidth,
  // thumbnailHeight,
  // fileSize,
  // keyboard
};

bot.sendVideo(to, videoPath, thumbnailPath, fileDuration, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
