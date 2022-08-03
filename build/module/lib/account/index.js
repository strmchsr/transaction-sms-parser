import { combinedWords, wallets } from '../constants';
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
const getAccount = (message) => {
    const processedMessage = getProcessedMessage(message);
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
export default getAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FjY291bnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEQsT0FBTyxFQUFnQixZQUFZLEVBQWdCLE1BQU0sY0FBYyxDQUFDO0FBQ3hFLE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDJCQUEyQixHQUM1QixNQUFNLFVBQVUsQ0FBQztBQUVsQixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQWlCLEVBQWdCLEVBQUU7SUFDbEQsSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUNqQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsSUFBSSxLQUFLLE1BQU07UUFDZixhQUFhLENBQUMsaUNBQWlDO2FBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDO2FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbkIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ1AsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUUxQyxzREFBc0Q7SUFDdEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJ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