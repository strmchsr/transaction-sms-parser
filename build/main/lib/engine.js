"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionInfo = exports.getTransactionType = exports.getTransactionAmount = void 0;
const account_1 = require("./account");
const balance_1 = __importDefault(require("./balance"));
const interface_1 = require("./interface");
const utils_1 = require("./utils");
const getTransactionAmount = (message) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    const index = processedMessage.indexOf('rs.');
    // If "rs." does not exist
    // Return ""
    if (index === -1) {
        return '';
    }
    let money = message[index + 1];
    money = money.replace(/,/g, '');
    // If data is false positive
    // Look ahead one index and check for valid money
    // Else return the found money
    if (Number.isNaN(Number(money))) {
        money = message[index + 2];
        money = money === null || money === void 0 ? void 0 : money.replace(/,/g, '');
        // If this is also false positive, return ""
        // Else return the found money
        if (Number.isNaN(Number(money))) {
            return '';
        }
        return (0, utils_1.padCurrencyValue)(money);
    }
    return (0, utils_1.padCurrencyValue)(money);
};
exports.getTransactionAmount = getTransactionAmount;
const getTransactionType = (message) => {
    const creditPattern = /(?:credited|credit|deposited|added|received|refund)/gi;
    const debitPattern = /(?:debited|debit|deducted|w\/d)/gi;
    const miscPattern = /(?:payment|spent|paid|used\sat|charged|transaction\son|transaction\sfee|tran|booked|purchased)/gi;
    const messageStr = typeof message !== 'string' ? message.join(' ') : message;
    if (debitPattern.test(messageStr)) {
        return 'debit';
    }
    if (creditPattern.test(messageStr)) {
        return 'credit';
    }
    if (miscPattern.test(messageStr)) {
        return 'debit';
    }
    return '';
};
exports.getTransactionType = getTransactionType;
const getTransactionInfo = (message, sender) => {
    if (!message || typeof message !== 'string') {
        return {
            account: {
                type: interface_1.IAccountType.ACCOUNT,
            },
            transactionAmount: '',
            balance: { available: '' },
            transactionType: '',
            bankName: '',
        };
    }
    const processedMessage = (0, utils_1.processMessage)(message);
    const account = (0, account_1.getAccount)(processedMessage);
    const availableBalance = (0, balance_1.default)(processedMessage, interface_1.IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = (0, exports.getTransactionAmount)(processedMessage);
    const bankName = (0, account_1.getBankName)(sender);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? (0, exports.getTransactionType)(processedMessage) : '';
    const balance = { available: availableBalance };
    if (account && account.type === interface_1.IAccountType.CARD) {
        balance.outstanding = (0, balance_1.default)(processedMessage, interface_1.IBalanceKeyWordsType.OUTSTANDING);
    }
    // console.log(processedMessage);
    // console.log(account, balance, transactionAmount, transactionType);
    // console.log('-----------------------------------------------------');
    return {
        account,
        balance,
        transactionAmount,
        transactionType,
        bankName,
    };
};
exports.getTransactionInfo = getTransactionInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUNBQW9EO0FBQ3BELHdEQUFtQztBQUNuQywyQ0FNcUI7QUFDckIsbUNBQWdGO0FBRXpFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxPQUFxQixFQUFVLEVBQUU7SUFDcEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLDJCQUFtQixFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU5QywwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRS9CLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyw0QkFBNEI7SUFDNUIsaURBQWlEO0lBQ2pELDhCQUE4QjtJQUM5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLDRDQUE0QztRQUM1Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLElBQUEsd0JBQWdCLEVBQUMs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