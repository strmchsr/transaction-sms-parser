"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padCurrencyValue = exports.getProcessedMessage = exports.processMessage = exports.extractBondedAccountNo = exports.trimLeadingAndTrailingChars = exports.setRegexParser = void 0;
const constants_1 = require("./constants");
let regexParser;
const setRegexParser = (parser) => {
    regexParser = parser;
};
exports.setRegexParser = setRegexParser;
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
    regexParser.forEach((value, key) => {
        messageStr = messageStr.replace(key, value);
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE0QztBQUc1QyxJQUFJLFdBQVcsQ0FBQztBQUVULE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBMkIsRUFBRSxFQUFFO0lBQzVELFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxjQUFjLGtCQUV6QjtBQUVLLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUNqRSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ25FLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFFakUsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBUFcsUUFBQSwyQkFBMkIsK0JBT3RDO0FBRUssTUFBTSxzQkFBc0IsR0FBRyxDQUFDLFNBQWlCLEVBQVUsRUFBRTtJQUNsRSxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0FBQzFFLENBQUMsQ0FBQztBQUhXLFFBQUEsc0JBQXNCLDBCQUdqQztBQUVLLE1BQU0sY0FBYyxHQUFHLENBQUMsT0FBZSxFQUFZLEVBQUU7SUFDMUQsd0JBQXdCO0lBQ3hCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNILGdCQUFnQjtJQUNoQix5QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzNELENBQUMsQ0FBQztBQVhXLFFBQUEsY0FBYyxrQkFXekI7QUFFSyxNQUFNLG1CQUFtQixHQUFHLENBQUMsT0FBcUIsRUFBRSxFQUFFO0lBQzNELElBQUksZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO0lBQ3BDLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQy9CLGdCQUFnQixHQUFHLElBQUEsc0JBQWMsRUFBQyxPQUFPLENBQUMsQ0FBQztLQUM1QztTQUFNO1FBQ0wsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO0tBQzVCO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFUVyxRQUFBLG1CQUFtQix1QkFTOUI7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDdEQsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDaEQsQ0FBQyxDQUFDO0FBSFcsUUFBQSxnQkFBZ0Isb0JBRzNCIn0=