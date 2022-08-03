import getAccount from './account';
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
    const debitPattern = /(?:debited|debit|deducted)/gi;
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
export const getTransactionInfo = (message) => {
    if (!message || typeof message !== 'string') {
        return {
            account: {
                type: IAccountType.ACCOUNT,
            },
            transactionAmount: '',
            balance: { available: '' },
            transactionType: '',
        };
    }
    const processedMessage = processMessage(message);
    const account = getAccount(processedMessage);
    const availableBalance = getBalance(processedMessage, IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = getTransactionAmount(processedMessage);
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
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sVUFBVSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsWUFBWSxFQUVaLG9CQUFvQixHQUdyQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWhGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBcUIsRUFBVSxFQUFFO0lBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFL0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRWhDLDRCQUE0QjtJQUM1QixpREFBaUQ7SUFDakQsOEJBQThCO0lBQzlCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMvQixLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixLQUFLLEdBQUcsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakMsNENBQTRDO1FBQzVDLDhCQUE4QjtRQUM5QixJ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