"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedWords = exports.bankKeywords = exports.wallets = exports.outstandingBalanceKeywords = exports.availableBalanceKeywords = void 0;
const interface_1 = require("./interface");
exports.availableBalanceKeywords = [
    'avbl bal',
    'available balance',
    'available limit',
    'limit available',
    'a/c bal',
    'ac bal',
    'available bal',
    'avl bal',
    'updated balance',
    'total balance',
    'new balance',
    'bal',
    'avl lmt',
];
exports.outstandingBalanceKeywords = ['outstanding'];
exports.wallets = ['paytm', 'simpl', 'lazypay', 'amazon_pay'];
exports.bankKeywords = [
    {
        key: 'ALBANK',
        bankName: 'Allahabad Bank',
    },
    {
        key: 'ATMSBI',
        bankName: 'STATE BANK OF INDIA',
    },
    {
        key: 'SBI',
        bankName: 'STATE BANK OF INDIA',
    },
    {
        key: 'AXIS',
        bankName: 'AXIS BANK LIMITED',
    },
    {
        key: 'HDFC',
        bankName: 'HDFC Bank',
    },
    {
        key: 'BOB',
        bankName: 'Bank of Baroda',
    },
    {
        key: 'PNB',
        bankName: 'PNB',
    },
    {
        key: 'CITI',
        bankName: 'CITI',
    },
    {
        key: 'KOTAK',
        bankName: 'KOTAK',
    },
    {
        key: 'ICICI',
        bankName: 'ICICI',
    },
    {
        key: 'HSBC',
        bankName: 'HSBC',
    },
    {
        key: 'IDFC',
        bankName: 'IDFC',
    },
];
exports.combinedWords = [
    {
        regex: /credit\scard/g,
        word: 'c_card',
        type: interface_1.IAccountType.CARD,
    },
    {
        regex: /amazon\spay/g,
        word: 'amazon_pay',
        type: interface_1.IAccountType.WALLET,
    },
    {
        regex: /uni\scard/g,
        word: 'uni_card',
        type: interface_1.IAccountType.CARD,
    },
    {
        regex: /niyo\scard/g,
        word: 'niyo',
        type: interface_1.IAccountType.ACCOUNT,
    },
    {
        regex: /slice\scard/g,
        word: 'slice_card',
        type: interface_1.IAccountType.CARD,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXNFO0FBRXpELFFBQUEsd0JBQXdCLEdBQUc7SUFDdEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsZUFBZTtJQUNmLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGFBQWE7SUFDYixLQUFLO0lBQ0wsU0FBUztDQUNWLENBQUM7QUFFVyxRQUFBLDBCQUEwQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFN0MsUUFBQSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUV0RCxRQUFBLFlBQVksR0FBZ0I7SUFDdkM7UUFDRSxHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLEdBQUcsRUFBRSxRQUFRO1FBQ2IsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNEO1FBQ0UsR0FBRyxFQUFFLEtBQUs7UUFDVixRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsTUFBTTtRQUNYLFFBQVEsRUFBRSxtQkFBbUI7S0FDOUI7SUFDRDtRQUNFLEdBQUcsRUFBRSxNQUFNO1FBQ1gsUUFBUSxFQUFFLFdBQVc7S0FDdEI7SUFDRDtRQUNFLEdBQUcsRUFBRSxLQUFLO1FBQ1YsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLEtBQUs7UUFDVixRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtDQUNGLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBcUI7SUFDN0M7UUFDRSxLQUFLLEVBQUUsZUFBZTtRQUN0QixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSx3QkFBWSxDQUFDLElBQUk7S0FDeEI7SUFDRDtRQUNFLEtBQUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSx3QkFBWSxDQUFDLE1BQU07S0FDMUI7SUFDRDtRQUNFLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSx3QkFBWSxDQUFDLElBQUk7S0FDeEI7SUFDRDtRQUNFLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLHdCQUFZLENBQUMsT0FBTztLQUMzQjtJQUNEO1FBQ0UsS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLHdCQUFZLENBQUMsSUFBSTtLQUN4QjtDQUNGLENBQUMifQ==