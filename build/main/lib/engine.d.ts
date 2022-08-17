import { ITransactionInfo, TMessageType } from './interface';
export declare const getTransactionAmount: (message: TMessageType, parser: Map<RegExp, string>) => string;
export declare const getTransactionType: (message: TMessageType) => "debit" | "credit" | "";
export declare const getTransactionInfo: (message: string, sender: string, parser: Map<RegExp, string>) => ITransactionInfo;
