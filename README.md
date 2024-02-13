# Chzzk Chat Crawler

---

<img alt="chzzk_logo" src="./img/chzzk_logo.svg" style="width: 50%">

Javascript를 통해 치지직 채팅을 크롤링하는 코드입니다.

# Install

---

## Node

```bash
$ npm install @d2n0s4ur/chzzk-chat
```

```typescript
import { ChzzkChat } from "@d2n0s4ur/chzzk-chat";
import type { messageHandler } from "@d2n0s4ur/chzzk-chat";

const chzzkChat = new ChzzkChat("YOUR_CHZZK_USER_HASH");
// ex) CHzzkchat('dfffd9591264f43f4cbe3e2e3252c35c)

const messageHandler: messageHandler = (
  badges: string[],
  nick: string,
  message: string,
  isDonation: boolean,
  donationAmount?: number
) => {
  console.log(
    `${nick}: ${message} ${isDonation ? `(${donationAmount}원)` : ""}`
  );
};
```
