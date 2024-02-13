export type messageHandler = (badges: string[], nick: string, message: string, isDonation: boolean, donationAmount?: number) => void;
export declare class ChzzkChat {
    private initialization;
    ws: WebSocket | undefined;
    messageHandler: messageHandler;
    chzzkChannelId: string;
    chatChannelAccessToken: string;
    chatChannelId: string;
    sid: string;
    uuid: string;
    addMessageHandler: (handler: messageHandler) => void;
    getChatChannelId: (chzzkChannelId: string) => Promise<string>;
    getChatChannelAccessToken: (chatChannelId: string) => Promise<string>;
    parseBadgeUrl: (badge: any[] | undefined) => string[];
    init: () => Promise<void>;
    constructor(chzzkChannelId: string);
    onOpen(event: Event): void;
    onClose(event: CloseEvent): void;
    onError(event: Event): void;
    onMessage(event: MessageEvent): void;
    closs: () => void;
}
