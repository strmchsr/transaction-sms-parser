"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankName = exports.getAccount = void 0;
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
const getBankName = (sender) => {
    let bankName = '';
    constants_1.bankKeywords.forEach((item) => {
        if (sender.toLowerCase().includes(item.key.toLowerCase())) {
            bankName = item.bankName;
        }
    });
    return bankName;
};
exports.getBankName = getBankName;
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
exports.getAccount = getAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FjY291bnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQW9FO0FBQ3BFLDRDQUF3RTtBQUN4RSxvQ0FJa0I7QUFFbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFpQixFQUFnQixFQUFFO0lBQ2xELElBQUksZ0JBQWdCLENBQUM7SUFDckIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FDakMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksS0FBSyxNQUFNO1FBQ2YseUJBQWEsQ0FBQyxpQ0FBaUM7YUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHdCQUFZLENBQUMsSUFBSSxDQUFDO2FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbkIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ1AsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUUxQyxzREFBc0Q7SUFDdEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsd0JBQVksQ0FBQyxJQUFJLENBQUM7UUFFOUIsZ0NBQWdDO1FBQ2hDLG1CQUFtQjtRQUNuQiw0QkFBNEI7UUFDNUIsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMs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