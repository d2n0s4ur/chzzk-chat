# Chzzk-Chat library

![Test workflow status](https://github.com/d2n0s4ur/chzzk-chat/workflows/Test/badge.svg)
[![Npm Version](https://img.shields.io/npm/v/@d2n0s4ur/chzzk-chat.svg?style=flat)](https://www.npmjs.com/package/@d2n0s4ur/chzzk-chat)
[![Downloads](https://img.shields.io/npm/dm/@d2n0s4ur/chzzk-chat.svg?style=flat)](https://www.npmjs.com/package/@d2n0s4ur/chzzk-chat)
[![Issues](https://img.shields.io/github/issues/d2n0s4ur/chzzk-chat.svg?style=flat)](https://github.com/d2n0s4ur/chzzk-chat)
[![Node version](https://img.shields.io/node/v/@d2n0s4ur/chzzk-chat)](https://www.npmjs.com/package/@d2n0s4ur/chzzk-chat)



<img alt="chzzk_logo" src="./img/chzzk_logo.svg" style="width: 40%">

Javascript를 통해 치지직 채팅을 크롤링하는 코드입니다.

# Install


## Node

### NPM
```bash
$ npm install @d2n0s4ur/chzzk-chat
```

### Yarn
```bash
$ yarn add @d2n0s4ur/chzzk-chat
```

## Usage

```typescript
import { ChzzkChat } from "@d2n0s4ur/chzzk-chat";

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

chzzkChat.addMessageHandler(messageHandler);
```