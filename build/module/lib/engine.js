import { getAccount, getBankName } from './account';
import getBalance from './balance';
import { IAccountType, IBalanceKeyWordsType, } from './interface';
import { getProcessedMessage, padCurrencyValue, processMessage } from './utils';
export const getTransactionAmount = (message, parser) => {
    const processedMessage = getProcessedMessage(message, parser);
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
export const getTransactionInfo = (message, sender, parser) => {
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
    const processedMessage = processMessage(message, parser);
    const account = getAccount(processedMessage, parser);
    const availableBalance = getBalance(processedMessage, parser, IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = getTransactionAmount(processedMessage, parser);
    const bankName = getBankName(sender);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? getTransactionType(processedMessage) : '';
    const balance = { available: availableBalance };
    if (account && account.type === IAccountType.CARD) {
        balance.outstanding = getBalance(processedMessage, parser, IBalanceKeyWordsType.OUTSTANDING);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEQsT0FBTyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxZQUFZLEVBRVosb0JBQW9CLEdBR3JCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFaEYsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsT0FBcUIsRUFDckIsTUFBMkIsRUFDbkIsRUFBRTtJQUNWLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlELE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU5QywwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRS9CLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyw0QkFBNEI7SUFDNUIsaURBQWlEO0lBQ2pELDhCQUE4QjtJQUM5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0IsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsS0FBSyxHQUFHLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLDRDQUE0QztRQUM1Qyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE9BQXFCLEVBQUUsRUFBRTtJQUMxRCxNQUFNLGFBQWEsR0FBRyx1REFBdUQsQ0FBQztJQUM5RSxNQUFNLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQztJQUN6RCxNQUFNLFdBQVcsR0FDZixrR0FBa0csQ0FBQztJQUVyRyxNQUFNLFVBQVUsR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUU3RSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFDRCxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbEMsT0FBTyxRQUFRLENBQUM7S0FDakI7SUFDRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDaEMsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQ2hDLE9BQWUsRUFDZixNQUFjLEVBQ2QsTUFBMkIsRUFDVCxFQUFFO0lBQ3BCLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzNDLE9BQU87WUFDTCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPO2FBQzNCO1lBQ0QsaUJBQWlCLEVBQUUsRUFBRTtZQUNyQixPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO1lBQzFCLGVBQWUsRUFBRSxFQUFFO1lBQ25CLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztLQUNIO0lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRCxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FDakMsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixvQkFBb0IsQ0FBQyxTQUFTLENBQy9CLENBQUM7SUFDRixNQUFNLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxNQUFNLE9BQU8sR0FDWCxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQzFELENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUNoQixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDaEIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDNUUsTUFBTSxPQUFPLEdBQWEsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztJQUUxRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDakQsT0FBTyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQzlCLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sb0JBQW9CLENBQUMsV0FBVyxDQUNqQyxDQUFDO0tBQ0g7SUFFRCxpQ0FBaUM7SUFDakMscUVBQXFFO0lBQ3JFLHdFQUF3RTtJQUN4RSxPQUFPO1FBQ0wsT0FBTztRQUNQLE9BQU87UUFDUCxpQkFBaUI7UUFDakIsZUFBZTtRQUNmLFFBQVE7S0FDVCxDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=