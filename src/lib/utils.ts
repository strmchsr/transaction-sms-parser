import { combinedWords } from './constants';
import { TMessageType } from './interface';

export const trimLeadingAndTrailingChars = (str: string): string => {
  const [first, last] = [str[0], str[str.length - 1]];

  let finalStr = Number.isNaN(Number(last)) ? str.slice(0, -1) : str;
  finalStr = Number.isNaN(Number(first)) ? str.slice(1) : finalStr;

  return finalStr;
};

export const extractBondedAccountNo = (accountNo: string): string => {
  const strippedAccountNo = accountNo.replace('ac', '');
  return Number.isNaN(Number(strippedAccountNo)) ? '' : strippedAccountNo;
};

export const processMessage = (
  message: string,
  parser: Map<RegExp, string>
): string[] => {
  // convert to lower case
  let messageStr = message.toLowerCase();
  parser.forEach((value, key) => {
    messageStr = messageStr.replace(key, value);
  });
  // combine words
  combinedWords.forEach((word) => {
    messageStr = messageStr.replace(word.regex, word.word);
  });
  return messageStr.split(' ').filter((str) => str !== '');
};

export const getProcessedMessage = (
  message: TMessageType,
  parser: Map<RegExp, string>
) => {
  let processedMessage: string[] = [];
  if (typeof message === 'string') {
    processedMessage = processMessage(message, parser);
  } else {
    processedMessage = message;
  }

  return processedMessage;
};

export const padCurrencyValue = (val: string): string => {
  const [lhs, rhs] = val.split('.');
  return `${lhs}.${(rhs ?? '').padEnd(2, '0')}`;
};
