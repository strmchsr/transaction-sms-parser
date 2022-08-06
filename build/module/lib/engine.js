import { getAccount, getBankName } from './account';
import getBalance from './balance';
import { IAccountType, IBalanceKeyWordsType, } from './interface';
import { getProcessedMessage, padCurrencyValue, processMessage } from './utils';
export const getTransactionAmount = (message) => {
    const processedMessage = getProcessedMessage(message);
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
        money = money?.replace(/,/g, '');
        // If this is also false positive, return ""
        // Else return the found money
        if (Number.isNaN(Number(money))) {
            return '';
        }
        return padCurrencyValue(money);
    }
    return padCurrencyValue(money);
};
export const getTransactionType = (message) => {
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
export const getTransactionInfo = (message, sender) => {
    if (!message || typeof message !== 'string') {
        return {
            account: {
                type: IAccountType.ACCOUNT,
            },
            transactionAmount: '',
            balance: { available: '' },
            transactionType: '',
            bankName: '',
        };
    }
    const processedMessage = processMessage(message);
    const account = getAccount(processedMessage);
    const availableBalance = getBalance(processedMessage, IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = getTransactionAmount(processedMessage);
    const bankName = getBankName(sender);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? getTransactionType(processedMessage) : '';
    const balance = { available: availableBalance };
    if (account && account.type === IAccountType.CARD) {
        balance.outstanding = getBalance(processedMessage, IBalanceKeyWordsType.OUTSTANDING);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEQsT0FBTyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxZQUFZLEVBRVosb0JBQW9CLEdBR3JCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFaEYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxPQUFxQixFQUFVLEVBQUU7SUFDcEUsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUMsMEJBQTBCO0lBQzFCLFlBQVk7SUFDWixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUvQixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFaEMsNEJBQTRCO0lBQzVCLGlEQUFpRDtJQUNqRCw4QkFBOEI7SUFDOUIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQy9CLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLEtBQUssR0FBRyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQyw0Q0FBNEM7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