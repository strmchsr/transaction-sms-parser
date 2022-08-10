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
const processMessage = (message) => {
    // convert to lower case
    let messageStr = message.toLowerCase();
    // remove '-'
    messageStr = messageStr.replace(/-/g, '');
    // remove ':'
    messageStr = messageStr.replace(/:/g, ' ');
    // remove '/'
    messageStr = messageStr.replace(/\//g, '');
    // remove '='
    messageStr = messageStr.replace(/=/g, ' ');
    // remove '{}'
    messageStr = messageStr.replace(/[{}]/g, ' ');
    // remove \n
    messageStr = messageStr.replace(/\n/g, ' ');
    // remove 'ending'
    messageStr = messageStr.replace(/ending /g, '');
    // replace 'x'
    messageStr = messageStr.replace(/x|[*]/g, '');
    // // remove 'is' 'with'
    // message = message.replace(/\bis\b|\bwith\b/g, '');
    // replace 'is'
    messageStr = messageStr.replace(/is /g, '');
    // replace 'with'
    messageStr = messageStr.replace(/with /g, '');
    // remove 'no.'
    messageStr = messageStr.replace(/no. /g, '');
    // replace all ac, acct, account with ac
    messageStr = messageStr.replace(/\bac\b|\bacct\b|\baccount\b|\bAc\b/g, 'ac');
    // replace all 'rs' with 'rs. '
    messageStr = messageStr.replace(/rs(?=\w)/g, 'rs. ');
    // replace all 'rs ' with 'rs. '
    messageStr = messageStr.replace(/rs /g, 'rs. ');
    // replace all inr with rs.
    messageStr = messageStr.replace(/inr(?=\w)/g, 'rs. ');
    //
    messageStr = messageStr.replace(/inr /g, 'rs. ');
    // replace all 'rs. ' with 'rs.'
    messageStr = messageStr.replace(/rs. /g, 'rs.');
    // replace all 'rs.' with 'rs. '
    messageStr = messageStr.replace(/rs.(?=\w)/g, 'rs. ');
    // combine words
    constants_1.combinedWords.forEach((word) => {
        messageStr = messageStr.replace(word.regex, word.word);
    });
    return messageStr.split(' ').filter((str) => str !== '');
};
exports.processMessage = processMessage;
const getProcessedMessage = (message) => {
    let processedMessage = [];
    if (typeof message === 'string') {
        processedMessage = (0, exports.processMessage)(message);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE0QztBQUdyQyxNQUFNLDJCQUEyQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDakUsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNuRSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRWpFLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQVBXLFFBQUEsMkJBQTJCLCtCQU90QztBQUVLLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFIVyxRQUFBLHNCQUFzQiwwQkFHakM7QUFFSyxNQUFNLGNB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