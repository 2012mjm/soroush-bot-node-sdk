const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const to = "GrAsMSI1kgbGrza8OrWWyhaQrOt6J4oCbXBHtAWSaNaCNw7VnlPboGhYut1";
const filePath = "my_file.pdf";

// Optional
const options = {
  caption: "Caption for this file"
  // fileName,
  // fileSize,
  // keyboard
};

bot.sendFile(to, filePath, options).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
