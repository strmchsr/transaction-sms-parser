import { ITransactionInfo, TMessageType } from './interface';
export declare const getTransactionAmount: (message: TMessageType) => string;
export declare const getTransactionType: (message: TMessageType) => "debit" | "credit" | "";
export declare const getTransactionInfo: (message: string) => ITransactionInfo;
