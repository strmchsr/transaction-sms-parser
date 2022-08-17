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
const getTransactionAmount = (message, parser) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message, parser);
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
const getTransactionInfo = (message, sender, parser) => {
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
    const processedMessage = (0, utils_1.processMessage)(message, parser);
    const account = (0, account_1.getAccount)(processedMessage, parser);
    const availableBalance = (0, balance_1.default)(processedMessage, parser, interface_1.IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = (0, exports.getTransactionAmount)(processedMessage, parser);
    const bankName = (0, account_1.getBankName)(sender);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? (0, exports.getTransactionType)(processedMessage) : '';
    const balance = { available: availableBalance };
    if (account && account.type === interface_1.IAccountType.CARD) {
        balance.outstanding = (0, balance_1.default)(processedMessage, parser, interface_1.IBalanceKeyWordsType.OUTSTANDING);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdUNBQW9EO0FBQ3BELHdEQUFtQztBQUNuQywyQ0FNcUI7QUFDckIsbUNBQWdGO0FBRXpFLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsT0FBcUIsRUFDckIsTUFBMkIsRUFDbkIsRUFBRTtJQUNWLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUQsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFL0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRWhDLDRCQUE0QjtJQUM1QixpREFBaUQ7SUFDakQsOEJBQThCO0lBQzlCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvQixLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixLQUFLLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakMsNENBQTRDO1FBQzVDLDhCQUE4QjtRQUM5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNE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