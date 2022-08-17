import { getAccount, getBankName } from './lib/account';
import getBalance from './lib/balance';
import { setRegexParser } from './lib/utils';

export * from './lib/engine';
const smsParser = (regexParserMap: Map<RegExp, string>) => {
    setRegexParser(regexParserMap);
};

smsParser.prototype.getAccountInfo = getAccount;
smsParser.prototype.getBalanceInfo = getBalance;
smsParser.prototype.getBankNameInfo = getBankName;

export const SmsParser = smsParser;
