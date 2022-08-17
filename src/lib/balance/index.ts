import {
  availableBalanceKeywords,
  outstandingBalanceKeywords,
} from '../constants';
import { IBalanceKeyWordsType, TMessageType } from '../interface';
import { getProcessedMessage, padCurrencyValue } from '../utils';

const extractBalance = (
  index: number,
  message: string,
  length: number
): string => {
  let balance = '';
  let sawNumber = false;
  let invalidCharCount = 0;
  let char = '';
  let start = index;
  while (start < length) {
    char = message[start];

    if (char >= '0' && char <= '9') {
      sawNumber = true;
      // is_start = false;
      balance += char;
    } else if (sawNumber) {
      if (char === '.') {
        if (invalidCharCount === 1) {
          break;
        } else {
          balance += char;
          invalidCharCount += 1;
        }
      } else if (char !== ',') {
        break;
      }
    }

    start += 1;
  }

  return balance;
};

const findNonStandardBalance = (
  message: string,
  keyWordType: IBalanceKeyWordsType = IBalanceKeyWordsType.AVAILABLE
) => {
  const balanceKeywords =
    keyWordType === IBalanceKeyWordsType.AVAILABLE
      ? availableBalanceKeywords
      : outstandingBalanceKeywords;

  const balRegex = `(${balanceKeywords.join('|')})`.replace('/', '\\/');
  const regex = new RegExp(`${balRegex}\\s*[\\d]+\\.*[\\d]*`, 'gi');
  const matches = message.match(regex);
  if (matches && matches.length > 0) {
    const balance = matches[0].split(' ').pop(); // return only first match
    return Number.isNaN(Number(balance)) ? '' : balance;
  }
  return '';
};

const getBalance = (
  message: TMessageType,
  parser: Map<RegExp, string>,
  keyWordType: IBalanceKeyWordsType = IBalanceKeyWordsType.AVAILABLE,
) => {
  const processedMessage = getProcessedMessage(message, parser);
  const messageString = processedMessage.join(' ');
  let indexOfKeyword = -1;
  let balance = '';

  const balanceKeywords =
    keyWordType === IBalanceKeyWordsType.AVAILABLE
      ? availableBalanceKeywords
      : outstandingBalanceKeywords;

  // eslint-disable-next-line no-restricted-syntax
  for (const word of balanceKeywords) {
    indexOfKeyword = messageString.indexOf(word);

    if (indexOfKeyword !== -1) {
      indexOfKeyword += word.length;
      break;
    } else {
      // eslint-disable-next-line no-continue
      continue;
    }
  }

  // found the index of keyword, moving on to finding 'rs.' occuring after indexOfKeyword
  let index = indexOfKeyword;
  let indexOfRs = -1;
  let nextThreeChars = messageString.substr(index, 3);

  index += 3;

  while (index < messageString.length) {
    // discard first char
    nextThreeChars = nextThreeChars.slice(1);
    // add the current char at the end
    nextThreeChars += messageString[index];

    if (nextThreeChars === 'rs.') {
      indexOfRs = index + 2;
      break;
    }

    index += 1;
  }

  // no occurence of 'rs.'
  if (indexOfRs === -1) {
    // check for non standard balance
    balance = findNonStandardBalance(messageString);
    return balance ? padCurrencyValue(balance) : '';
  }

  balance = extractBalance(indexOfRs, messageString, messageString.length);

  return padCurrencyValue(balance);
};

export default getBalance;
