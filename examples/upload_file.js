const SoroushBot = require("../src/SoroushBot");

const bot = new SoroushBot(process.env.BOT_TOKEN);

const filePath = "my_image.jpg";

bot.uploadFile(filePath).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);