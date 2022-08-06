import { getAccount, getBankName } from './lib/account';
import getBalance from './lib/balance';

export * from './lib/engine';
export const getAccountInfo = getAccount;
export const getBalanceInfo = getBalance;
export const getBankNameInfo = getBankName;
