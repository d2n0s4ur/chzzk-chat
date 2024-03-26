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
// ex) ChzzkChat('dfffd9591264f43f4cbe3e2e3252c35c')
```

### 1. Add message Handler

```typescript
const messageHandler: messageHandler = (
  badges: string[],
  nick: string,
  message: string
) => {
  console.log(`${nick}: ${message}`);
};

chzzkChat.addMessageHandler(messageHandler);
```

### 2. Add donation Handler

```typescript
const donationHandler: donationHandler = (
  badges: string[],
  nick: string,
  message: string,
  isAnonymous: boolean,
  amount: number
) => {
  if (!isAnonymous) {
    console.log(`${nick}님이 ${amount}원을 후원했습니다: ${message}`);
  } else {
    console.log(`익명의 후원자가 ${amount}원을 후원했습니다: ${message}`);
  }
};

chzzkChat.addDonationHandler(donationHandler);
```

### 3. Add subscription Handler

```typescript
const subscriptionHandler: subscriptionHandler = (
  badges: string[],
  nick: string,
  message: string,
  month: number,
  tierName: string,
  tierNo: number
) => {
  console.log(
    `${nick}님이 ${month}개월 ${tierName}를 구독했습니다: ${message}`
  );
};

chzzkChat.addSubscriptionHandler(subscriptionHandler);
```

사용이 끝난 후, `chzzkChat.close()`를 호출하여 웹소켓을 닫아주세요.

After using the library, please call `chzzkChat.close()` to close the websocket.

```typescript
chzzkChat.close();
```
