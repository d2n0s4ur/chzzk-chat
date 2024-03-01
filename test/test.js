import { ChzzkChat } from '../dist/lib/chzzkChat.js';

function main() {
  const chzzkChat = new ChzzkChat("bdc57cc4217173f0e89f63fba2f1c6e5");
  
  chzzkChat.addMessageHandler((badges, nick, message) => {
    console.log(`${nick}: ${message}`);
  });
}

main();