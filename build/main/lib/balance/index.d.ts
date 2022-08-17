import { IBalanceKeyWordsType, TMessageType } from '../interface';
declare const getBalance: (message: TMessageType, parser: Map<RegExp, string>, keyWordType?: IBalanceKeyWordsType) => string;
export default getBalance;
