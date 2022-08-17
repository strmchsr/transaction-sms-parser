import { IAccountInfo, TMessageType } from '../interface';
declare const getBankName: (sender: string) => string;
declare const getAccount: (message: TMessageType, parser: Map<RegExp, string>) => IAccountInfo;
export { getAccount, getBankName };
