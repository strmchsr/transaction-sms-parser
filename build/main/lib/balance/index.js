"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const interface_1 = require("../interface");
const utils_1 = require("../utils");
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
const findNonStandardBalance = (message, keyWordType = interface_1.IBalanceKeyWordsType.AVAILABLE) => {
    const balanceKeywords = keyWordType === interface_1.IBalanceKeyWordsType.AVAILABLE
        ? constants_1.availableBalanceKeywords
        : constants_1.outstandingBalanceKeywords;
    const balRegex = `(${balanceKeywords.join('|')})`.replace('/', '\\/');
    const regex = new RegExp(`${balRegex}\\s*[\\d]+\\.*[\\d]*`, 'gi');
    const matches = message.match(regex);
    if (matches && matches.length > 0) {
        const balance = matches[0].split(' ').pop(); // return only first match
        return Number.isNaN(Number(balance)) ? '' : balance;
    }
    return '';
};
const getBalance = (message, keyWordType = interface_1.IBalanceKeyWordsType.AVAILABLE) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    const messageString = processedMessage.join(' ');
    let indexOfKeyword = -1;
    let balance = '';
    const balanceKeywords = keyWordType === interface_1.IBalanceKeyWordsType.AVAILABLE
        ? constants_1.availableBalanceKeywords
        : constants_1.outstandingBalanceKeywords;
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
        return balance ? (0, utils_1.padCurrencyValue)(balance) : '';
    }
    balance = extractBalance(indexOfRs, messageString, messageString.length);
    return (0, utils_1.padCurrencyValue)(balance);
};
exports.default = getBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2JhbGFuY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FHc0I7QUFDdEIsNENBQWtFO0FBQ2xFLG9DQUFpRTtBQUVqRSxNQUFNLGNBQWMsR0FBRyxDQUNyQixLQUFhLEVBQ2IsT0FBZSxFQUNmLE1BQWMsRUFDTixFQUFFO0lBQ1YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsT0FBTyxLQUFLLEdBQUcsTUFBTSxFQUFFO1FBQ3JCLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQixvQkFBb0I7WUFDcEIsT0FBTyxJQUFJLElBQUksQ0FBQztTQUNqQjthQUFNLElBQUksU0FBUyxFQUFFO1lBQ3BCLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7b0JBQzFCLE1BQU07aUJBQ1A7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLElBQUksQ0FBQztvQkFDaEIsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO2lCQUN2QjthQUNGO2lCQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsTUFBTTthQUNQO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHLENBQzdCLE9BQWUs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