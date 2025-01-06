import { ChzzkChat } from "@d2n0s4ur/chzzk-chat";

function main() {
  const chzzkChat = new ChzzkChat("dfffd9591264f43f4cbe3e2e3252c35c");
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
