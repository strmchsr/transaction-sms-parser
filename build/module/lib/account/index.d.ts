import { IAccountInfo, TMessageType } from '../interface';
declare const getBankName: (sender: string) => string;
declare const getAccount: (message: TMessageType) => IAccountInfo;
export { getAccount, getBankName };
