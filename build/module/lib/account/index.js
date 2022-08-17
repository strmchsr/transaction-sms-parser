import { bankKeywords, combinedWords, wallets } from '../constants';
import { IAccountType } from '../interface';
import { extractBondedAccountNo, getProcessedMessage, trimLeadingAndTrailingChars, } from '../utils';
const getCard = (message) => {
    let combinedCardName;
    const cardIndex = message.findIndex((word) => word === 'card' ||
        combinedWords // Any combined word of card type
            .filter((w) => w.type === IAccountType.CARD)
            .some((w) => {
            if (w.word === word) {
                combinedCardName = w.word;
                return true;
            }
            return false;
        }));
    const card = { type: null };
    // Search for "card" and if not found return empty obj
    if (cardIndex !== -1) {
        card.number = message[cardIndex + 1];
        card.type = IAccountType.CARD;
        // If the data is false positive
        // return empty obj
        // Else return the card info
        if (Number.isNaN(Number(card.number))) {
            return {
                type: combinedCardName ? card.type : null,
                name: combinedCardName,
            };
        }
        return card;
    }
    return { type: null };
};
const getBankName = (sender) => {
    let bankName = '';
    bankKeywords.forEach((item) => {
        if (sender.toLowerCase().includes(item.key.toLowerCase())) {
            bankName = item.bankName;
        }
    });
    return bankName;
};
const getAccount = (message, parser) => {
    const processedMessage = getProcessedMessage(message, parser);
    let accountIndex = -1;
    let account = {
        type: null,
        number: '',
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, word] of processedMessage.entries()) {
        if (word === 'ac') {
            if (index + 1 < processedMessage.length) {
                const accountNo = trimLeadingAndTrailingChars(processedMessage[index + 1]);
                if (Number.isNaN(Number(accountNo))) {
                    // continue searching for a valid account number
                    // eslint-disable-next-line no-continue
                    continue;
                }
                else {
                    accountIndex = index;
                    account.type = IAccountType.ACCOUNT;
                    account.number = accountNo;
                    break;
                }
            }
            else {
                // continue searching for a valid account number
                // eslint-disable-next-line no-continue
                continue;
            }
        }
        else if (word.includes('ac')) {
            const extractedAccountNo = extractBondedAccountNo(word);
            if (extractedAccountNo === '') {
                // eslint-disable-next-line no-continue
                continue;
            }
            else {
                accountIndex = index;
                account.type = IAccountType.ACCOUNT;
                account.number = extractedAccountNo;
                break;
            }
        }
    }
    // No occurence of the word "ac". Check for "card"
    if (accountIndex === -1) {
        account = getCard(processedMessage);
    }
    // Check for wallets
    if (!account.type) {
        const wallet = processedMessage.find((word) => {
            return wallets.includes(word);
        });
        if (wallet) {
            account.type = IAccountType.WALLET;
            account.name = wallet;
        }
    }
    // Check for special accounts
    if (!account.type) {
        const specialAccount = combinedWords
            .filter((word) => word.type === IAccountType.ACCOUNT)
            .find((w) => {
            return processedMessage.includes(w.word);
        });
        account.type = specialAccount?.type;
        account.name = specialAccount?.word;
    }
    return account;
};
export { getAccount, getBankName };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FjY291bnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BFLE9BQU8sRUFBZ0IsWUFBWSxFQUFnQixNQUFNLGNBQWMsQ0FBQztBQUN4RSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiwyQkFBMkIsR0FDNUIsTUFBTSxVQUFVLENBQUM7QUFFbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFpQixFQUFnQixFQUFFO0lBQ2xELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FDakMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksS0FBSyxNQUFNO1FBQ2YsYUFBYSxDQUFDLGlDQUFpQzthQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLElBQUksQ0FBQzthQUMzQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ25CLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNQLENBQUM7SUFDRixNQUFNLElBQUksR0FBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFMUMsc0RBQXNEO0lBQ3RELElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJ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