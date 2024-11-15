import { CloseEvent, Event, MessageEvent, WebSocket } from "ws";

export type messageHandler = ({
  badges,
  nick,
  message,
}: {
  badges: string[];
  nick: string;
  message: string;
}) => void;

export type donationHandler = ({
  badges,
  nick,
  message,
  isAnonymous,
  amount,
}: {
  badges: string[];
  nick: string;
  message: string;
  isAnonymous: boolean;
  amount: number;
}) => void;

export type subscriptionHandler = ({
  badges,
  nick,
  message,
  month,
  tierName,
  tierNo,
}: {
  badges: string[];
  nick: string;
  message: string;
  month: number;
  tierName: string;
  tierNo: number;
}) => void;

const chzzkIRCUrl = "wss://kr-ss3.chat.naver.com/chat";

export class ChzzkChat {
  private initialization;
  ws: WebSocket | undefined;
  messageHandler: messageHandler | undefined;
  donationHandler: donationHandler | undefined;
  subscriptionHandler: subscriptionHandler | undefined;
  chzzkChannelId: string;
  chatChannelAccessToken: string;
  chatChannelId: string;
  sid: string;
  uuid: string;

  init = async () => {
    this.chatChannelId = await this.getChatChannelId(this.chzzkChannelId);
    this.chatChannelAccessToken = await this.getChatChannelAccessToken(
      this.chatChannelId
    );

    this.ws = new WebSocket(chzzkIRCUrl);

    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onclose = this.onClose.bind(this);
    this.ws.onerror = this.onError.bind(this);
  };

  constructor(chzzkChannelId: string) {
    this.chzzkChannelId = chzzkChannelId;
    this.chatChannelId = "";
    this.chatChannelAccessToken = "";
    this.sid = "";
    this.uuid = "";
    this.initialization = this.init();
  }

  addMessageHandler = (handler: messageHandler) => {
    this.messageHandler = handler;
  };

  addDonationHandler = (handler: donationHandler) => {
    this.donationHandler = handler;
  };

  addSubscriptionHandler = (handler: subscriptionHandler) => {
    this.subscriptionHandler = handler;
  };

  getChatChannelId = async (chzzkChannelId: string) => {
    const url = `https://api.chzzk.naver.com/polling/v2/channels/${chzzkChannelId}/live-status`;

    const response = await fetch(url);
    const data = await response.json();

    return data.content.chatChannelId as string;
  };

  getChatChannelAccessToken = async (chatChannelId: string) => {
    const url = `https://comm-api.game.naver.com/nng_main/v1/chats/access-token?channelId=${chatChannelId}&chatType=STREAMING`;

    const response = await fetch(url);
    const data = await response.json();

    return data.content.accessToken as string;
  };

  parseBadgeUrl = (badge: any[] | undefined): string[] => {
    if (!badge) return [];
    return badge.map((b: any) => {
      return b.imageUrl as string;
    });
  };

  onOpen(event: Event) {
    if (!this.ws) return;
    console.log("Connected to Chzzk IRC");
    this.ws.send(
      `{"ver":"2","cmd":100,"svcid":"game","cid":"${this.chatChannelId}","bdy":{"uid":null,"devType":2001,"accTkn":"${this.chatChannelAccessToken}","auth":"READ"},"tid":1}`
    );
  }

  onClose(event: CloseEvent) {
    console.log("Disconnected from Chzzk IRC");
  }

  onError(event: Event) {
    console.log("Error from Chzzk IRC: ", event);
  }

  onMessage(event: MessageEvent) {
    if (!this.ws) return;
    const data = JSON.parse(event.data.toString());
    switch (data.cmd) {
      case 10100:
        this.sid = data.bdy.sid;
        this.uuid = data.bdy.uuid;
        console.log(`Connected to Chzzk Chat Successfully: ${this.sid}`);
        break;
      case 0:
        this.ws.send(`{"ver": "2", "cmd": 10000}`);
        break;
      case 94008:
        // cleanBot message
        break;
      default:
        if (!data.bdy) return;
        data.bdy.forEach((msg: any) => {
          const profile = JSON.parse(msg.profile);
          switch (data.cmd) {
            case 93101: // default message
              if (!this.messageHandler) return;
              this.messageHandler({
                badges: this.parseBadgeUrl(
                  profile ? profile.activityBadges : undefined
                ),
                nick: profile.nickname,
                message:
                  msg.msgStatusType === "CBOTBLIND"
                    ? "클린봇에 의해 삭제된 메시지입니다."
                    : msg.msg,
              });
              break;
            case 93102: // donation message
              const messageTypeCode = data.bdy[0].msgTypeCode;
              const extras = JSON.parse(data.bdy[0].extras);
              switch (messageTypeCode) {
                case 10: // donation message
                  if (!this.donationHandler) return;
                  this.donationHandler({
                    badges: this.parseBadgeUrl(
                      profile ? profile.activityBadges : undefined
                    ),
                    nick:
                      msg.uid !== "anonymous"
                        ? profile.nickname
                        : "익명의 후원자",
                    message: msg.msg,
                    isAnonymous: msg.uid === "anonymous",
                    amount: extras.payAmount,
                  });
                  break;
                case 11: // subscription message
                  if (!this.subscriptionHandler) return;
                  this.subscriptionHandler({
                    badges: this.parseBadgeUrl(
                      profile ? profile.activityBadges : undefined
                    ),
                    nick: profile.nickname,
                    message: msg.msg,
                    month: extras.month,
                    tierName: extras.tierName,
                    tierNo: extras.tierNo,
                  });
                  break;
                default: // unknown message
                  break;
              }
          }
        });
    }
  }

  closs = () => {
    if (!this.ws) return;
    this.ws.close();
  };
}
