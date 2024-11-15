import { ChzzkChat } from "../dist/lib/chzzkChat.js";

function main() {
  const chzzkChat = new ChzzkChat("bdc57cc4217173f0e89f63fba2f1c6e5");
  
  chzzkChat.addMessageHandler(({ badges, nick, message }) => {
    console.log(`${nick}: ${message}`);

    const emojiRegex = /:\w+:/g;
    const emojiMatches = message.match(emojiRegex);

    if (emojiMatches) {
      emojiMatches.forEach((emoji) => {
        const emojiName = emoji.slice(1, -1);
        const emojiUrl = chzzkChat.getEmojiUrl(emojiName);
        console.log(emojiUrl);
      });
    }
  });
}

main();
