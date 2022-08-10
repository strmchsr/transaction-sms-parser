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
    messageStr = messageStr.replace(/\.{2}|[*]/g, '');
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