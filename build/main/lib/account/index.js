"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const interface_1 = require("../interface");
const utils_1 = require("../utils");
const getCard = (message) => {
    let combinedCardName;
    const cardIndex = message.findIndex((word) => word === 'card' ||
        constants_1.combinedWords // Any combined word of card type
            .filter((w) => w.type === interface_1.IAccountType.CARD)
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
        card.type = interface_1.IAccountType.CARD;
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
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    let accountIndex = -1;
    let account = {
        type: null,
        number: '',
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, word] of processedMessage.entries()) {
        if (word === 'ac') {
            if (index + 1 < processedMessage.length) {
                const accountNo = (0, utils_1.trimLeadingAndTrailingChars)(processedMessage[index + 1]);
                if (Number.isNaN(Number(accountNo))) {
                    // continue searching for a valid account number
                    // eslint-disable-next-line no-continue
                    continue;
                }
                else {
                    accountIndex = index;
                    account.type = interface_1.IAccountType.ACCOUNT;
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
            const extractedAccountNo = (0, utils_1.extractBondedAccountNo)(word);
            if (extractedAccountNo === '') {
                // eslint-disable-next-line no-continue
                continue;
            }
            else {
                accountIndex = index;
                account.type = interface_1.IAccountType.ACCOUNT;
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
            return constants_1.wallets.includes(word);
        });
        if (wallet) {
            account.type = interface_1.IAccountType.WALLET;
            account.name = wallet;
        }
    }
    // Check for special accounts
    if (!account.type) {
        const specialAccount = constants_1.combinedWords
            .filter((word) => word.type === interface_1.IAccountType.ACCOUNT)
            .find((w) => {
            return processedMessage.includes(w.word);
        });
        account.type = specialAccount === null || specialAccount === void 0 ? void 0 : specialAccount.type;
        account.name = specialAccount === null || specialAccount === void 0 ? void 0 : specialAccount.word;
    }
    return account;
};
exports.default = getAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FjY291bnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBc0Q7QUFDdEQsNENBQXdFO0FBQ3hFLG9DQUlrQjtBQUVsQixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQWlCLEVBQWdCLEVBQUU7SUFDbEQsSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUNqQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsSUFBSSxLQUFLLE1BQU07UUFDZix5QkFBYSxDQUFDLGlDQUFpQzthQUM1QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssd0JBQVksQ0FBQyxJQUFJLENBQUM7YUFDM0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNuQixnQkFBZ0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMxQixPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FDUCxDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBRTFDLHNEQUFzRDtJQUN0RCxJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyx3QkFBWSxDQUFDLElBQUksQ0FBQztRQUU5QixnQ0FBZ0M7UUFDaEMsbUJBQW1CO1FBQ25CLDRCQUE0QjtRQUM1QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxN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