"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padCurrencyValue = exports.getProcessedMessage = exports.processMessage = exports.extractBondedAccountNo = exports.trimLeadingAndTrailingChars = void 0;
const constants_1 = require("./constants");
const trimLeadingAndTrailingChars = (str) => {
    const [first, last] = [str[0], str[str.length - 1]];
    let finalStr = Number.isNaN(Number(last)) ? str.slice(0, -1) : str;
    finalStr = Number.isNaN(Number(first)) ? str.slice(1) : finalStr;
    return finalStr;
};
exports.trimLeadingAndTrailingChars = trimLeadingAndTrailingChars;
const extractBondedAccountNo = (accountNo) => {
    const strippedAccountNo = accountNo.replace('ac', '');
    return Number.isNaN(Number(strippedAccountNo)) ? '' : strippedAccountNo;
};
exports.extractBondedAccountNo = extractBondedAccountNo;
const processMessage = (message, parser) => {
    // convert to lower case
    let messageStr = message.toLowerCase();
    parser.forEach((value, key) => {
        messageStr = messageStr.replace(key, value);
    });
    // combine words
    constants_1.combinedWords.forEach((word) => {
        messageStr = messageStr.replace(word.regex, word.word);
    });
    return messageStr.split(' ').filter((str) => str !== '');
};
exports.processMessage = processMessage;
const getProcessedMessage = (message, parser) => {
    let processedMessage = [];
    if (typeof message === 'string') {
        processedMessage = (0, exports.processMessage)(message, parser);
    }
    else {
        processedMessage = message;
    }
    return processedMessage;
};
exports.getProcessedMessage = getProcessedMessage;
const padCurrencyValue = (val) => {
    const [lhs, rhs] = val.split('.');
    return `${lhs}.${(rhs !== null && rhs !== void 0 ? rhs : '').padEnd(2, '0')}`;
};
exports.padCurrencyValue = padCurrencyValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE0QztBQUdyQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDakUsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNuRSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRWpFLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQVBXLFFBQUEsMkJBQTJCLCtCQU90QztBQUVLLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFIVyxRQUFBLHNCQUFzQiwwQkFHakM7QUFFSyxNQUFNLGNBQWMsR0FBRyxDQUM1QixPQUFlLEVBQ2YsTUFBMkIsRUFDakIsRUFBRTtJQUNaLHdCQUF3QjtJQUN4QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxnQkFBZ0I7SUFDaEIseUJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFkVyxRQUFBLGNBQWMsa0JBY3pCO0FBRUssTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxPQUFxQixFQUNyQixNQUEyQixFQUMzQixFQUFFO0lBQ0YsSUFBSSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7SUFDcEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDL0IsZ0JBQWdCLEdBQUcsSUFBQSxzQkFBYyxFQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO0tBQzVCO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFaVyxRQUFBLG1CQUFtQix1QkFZOUI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDdEQsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBSFcsUUFBQSxnQkFBZ0Isb0JBRzNCIn0=