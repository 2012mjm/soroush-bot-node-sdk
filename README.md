
# Soroush Messenger Bot Node SDK
Soroush Messenger Bot Wrapper for Node [developer] (https://soroush-app.ir/developer.html)

## Dependencies ##
- request
- eventsource
- image-size 
- is-image

## Installation ##
Run the below commands
```bash
yarn add soroush-bot-node-sdk
```

## Usage ##
```js
const SoroushBot = require("SoroushBot");

const bot = new SoroushBot(bot_token);

bot.onMessage = message => {
  console.log(
    `New message from ${message.from} \nType: ${message.type}\nBody: ${message.body}`
  );

  bot.sendText(message.from, "Your message receive").then(
    res => {
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
};
```
"to" value in above example is chat_id of a bot user. You can find it in front of 'from' key in a message that user has sent to your bot. 
You can see more examples in the [examples](https://github.com/2012mjm/soroush-bot-node-sdk/tree/master/examples) directory.

Run the below commands
```bash
git clone https://github.com/2012mjm/soroush-bot-node-sdk
cd soroush-bot-node-sdk
yarn
cd examples
node echo_bot.js
```

 ## Contribute ##
 Contributions to the package are always welcome!
 - Report any idea, bugs or issues you find on the [issue tracker](https://github.com/2012mjm/soroush-bot-node-sdk/issues).
 - You can grab the source code at the package's [Git repository](https://github.com/2012mjm/soroush-bot-node-sdk.git).