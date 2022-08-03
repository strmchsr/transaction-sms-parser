export * from './lib/engine';
export declare const getAccountInfo: (message: import("./lib/interface").TMessageType) => import("./lib/interface").IAccountInfo;
export declare const getBalanceInfo: (message: import("./lib/interface").TMessageType, keyWordType?: import("./lib/interface").IBalanceKeyWordsType) => string;
