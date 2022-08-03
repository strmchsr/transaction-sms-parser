export declare enum IAccountType {
    CARD = "CARD",
    WALLET = "WALLET",
    ACCOUNT = "ACCOUNT"
}
export declare enum IBalanceKeyWordsType {
    AVAILABLE = "AVAILABLE",
    OUTSTANDING = "OUTSTANDING"
}
export interface IAccountInfo {
    type: IAccountType | null;
    number?: string;
    name?: string;
}
export interface IBalance {
    available: string;
    outstanding?: string;
}
export declare type TMessageType = string | string[];
export interface ITransactionInfo {
    account: IAccountInfo;
    transactionAmount: string;
    balance?: IBalance;
    transactionType: 'debit' | 'credit' | '';
}
export interface ICombinedWords {
    regex: RegExp;
    word: string;
    type: IAccountType;
}
