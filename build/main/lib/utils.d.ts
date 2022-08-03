import { TMessageType } from './interface';
export declare const trimLeadingAndTrailingChars: (str: string) => string;
export declare const extractBondedAccountNo: (accountNo: string) => string;
export declare const processMessage: (message: string) => string[];
export declare const getProcessedMessage: (message: TMessageType) => string[];
export declare const padCurrencyValue: (val: string) => string;
