import { availableBalanceKeywords, outstandingBalanceKeywords, } from '../constants';
import { IBalanceKeyWordsType } from '../interface';
import { getProcessedMessage, padCurrencyValue } from '../utils';
const extractBalance = (index, message, length) => {
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
        }
        else if (sawNumber) {
            if (char === '.') {
                if (invalidCharCount === 1) {
                    break;
                }
                else {
                    balance += char;
                    invalidCharCount += 1;
                }
            }
            else if (char !== ',') {
                break;
            }
        }
        start += 1;
    }
    return balance;
};
const findNonStandardBalance = (message, keyWordType = IBalanceKeyWordsType.AVAILABLE) => {
    const balanceKeywords = keyWordType === IBalanceKeyWordsType.AVAILABLE
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
const getBalance = (message, parser, keyWordType = IBalanceKeyWordsType.AVAILABLE) => {
    const processedMessage = getProcessedMessage(message, parser);
    const messageString = processedMessage.join(' ');
    let indexOfKeyword = -1;
    let balance = '';
    const balanceKeywords = keyWordType === IBalanceKeyWordsType.AVAILABLE
        ? availableBalanceKeywords
        : outstandingBalanceKeywords;
    // eslint-disable-next-line no-restricted-syntax
    for (const word of balanceKeywords) {
        indexOfKeyword = messageString.indexOf(word);
        if (indexOfKeyword !== -1) {
            indexOfKeyword += word.length;
            break;
        }
        else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2JhbGFuY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUN4QiwwQkFBMEIsR0FDM0IsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLG9CQUFvQixFQUFnQixNQUFNLGNBQWMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakUsTUFBTSxjQUFjLEdBQUcsQ0FDckIsS0FBYSxFQUNiLE9BQWUsRUFDZixNQUFjLEVBQ04sRUFBRTtJQUNWLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLE9BQU8sS0FBSyxHQUFHLE1BQU0sRUFBRTtRQUNyQixJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakIsb0JBQW9CO1lBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUM7U0FDakI7YUFBTSxJQUFJLFNBQVMsRUFBRTtZQUNwQixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksZ0JBQWdCLEtBQUssQ0FBQyxFQUFFO29CQUMxQixNQUFNO2lCQUNQO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxJQUFJLENBQUM7b0JBQ2hCLGdCQUFnQixJQUFJLENBQUMsQ0FBQztpQkFDdkI7YUFDRjtpQkFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZC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