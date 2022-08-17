/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { getTransactionInfo } from '../lib/engine';
import { IAccountType, ITransactionInfo } from '../lib/interface';
import { padCurrencyValue } from '../lib/utils';

import testCases from './testCases.json';

const REGEXP = new Map([
  // remove '-'
  [/-/g, ' '],
  // remove ':'
  [/:/g, ' '],
  // remove '/'
  [/\//g, ''],
  // remove '='
  [/=/g, ' '],
  // remove '{}'
  [/[{}]/g, ' '],
  // remove \n
  [/\n/g, ' '],
  // remove 'ending'
  [/ending /g, ''],
  // replace 'x'
  [/x|[*]/g, ''],
  [/\.{2}|[*]/g, ''],
  // replace 'is'
  [/is /g, ''],
  // replace 'with'
  [/with /g, ''],
  // remove 'no.'
  [/no. /g, ''],
  // replace all ac, acct, account with ac
  [/\bac\b|\bacct\b|\baccount\b|\bAc\b/g, 'ac'],
  // replace all 'rs' with 'rs. '
  [/rs(?=\w)/g, 'rs. '],
  // replace all 'rs ' with 'rs. '
  [/rs /g, 'rs. '],
  // replace all inr with rs.
  [/inr(?=\w)/g, 'rs. '],
  [/inr /g, 'rs. '],
  [/rs. /g, 'rs.'],
  [/rs.(?=\w)/g, 'rs. '],
]);

testCases.forEach((testCase, index) => {
  test(`${testCase.name}-${index}`, (t) => {
    const expected: ITransactionInfo = {
      account: { type: testCase.accountType as IAccountType },
      transactionAmount: testCase.transactionAmount
        ? padCurrencyValue(`${testCase.transactionAmount}`)
        : '',
      transactionType: testCase.transactionType as 'debit' | 'credit' | '',
      bankName: testCase.bankName,
    };

    expected.balance = {
      available: testCase.balanceAvailable
        ? padCurrencyValue(`${testCase.balanceAvailable}`)
        : '',
    };

    // @ts-ignore
    if (testCase.balanceoutstanding) {
      expected.balance.outstanding = padCurrencyValue(
        // @ts-ignore
        `${testCase.balanceOutstanding}`
      );
    }

    // @ts-ignore
    if (testCase.accountNumber) {
      // @ts-ignore
      expected.account.number = `${testCase.accountNumber}`;
    }

    // @ts-ignore
    if (testCase.accountName) {
      // @ts-ignore
      expected.account.name = testCase.accountName;
    }

    const actual = getTransactionInfo(testCase.message, 'ICICI', REGEXP);

    t.deepEqual(actual, expected);
  });
});
