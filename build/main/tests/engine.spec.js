"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
const ava_1 = __importDefault(require("ava"));
const engine_1 = require("../lib/engine");
const utils_1 = require("../lib/utils");
const testCases_json_1 = __importDefault(require("./testCases.json"));
const REGEXP = new Map([
    // remove '-'
    [/-/g, ' '],
    // remove ':'
    [/:/g, ' '],
    // remove '/'
    [/\//g, ''],
    // remove '='
    [/=/g, ' '],
    // remove '{}'
    [/[{}]/g, ' '],
    // remove \n
    [/\n/g, ' '],
    // remove 'ending'
    [/ending /g, ''],
    // replace 'x'
    [/x|[*]/g, ''],
    [/\.{2}|[*]/g, ''],
    // replace 'is'
    [/is /g, ''],
    // replace 'with'
    [/with /g, ''],
    // remove 'no.'
    [/no. /g, ''],
    // replace all ac, acct, account with ac
    [/\bac\b|\bacct\b|\baccount\b|\bAc\b/g, 'ac'],
    // replace all 'rs' with 'rs. '
    [/rs(?=\w)/g, 'rs. '],
    // replace all 'rs ' with 'rs. '
    [/rs /g, 'rs. '],
    // replace all inr with rs.
    [/inr(?=\w)/g, 'rs. '],
    [/inr /g, 'rs. '],
    [/rs. /g, 'rs.'],
    [/rs.(?=\w)/g, 'rs. '],
]);
(0, utils_1.setRegexParser)(REGEXP);
testCases_json_1.default.forEach((testCase, index) => {
    (0, ava_1.default)(`${testCase.name}-${index}`, (t) => {
        const expected = {
            account: { type: testCase.accountType },
            transactionAmount: testCase.transactionAmount
                ? (0, utils_1.padCurrencyValue)(`${testCase.transactionAmount}`)
                : '',
            transactionType: testCase.transactionType,
            bankName: testCase.bankName,
        };
        expected.balance = {
            available: testCase.balanceAvailable
                ? (0, utils_1.padCurrencyValue)(`${testCase.balanceAvailable}`)
                : '',
        };
        // @ts-ignore
        if (testCase.balanceoutstanding) {
            expected.balance.outstanding = (0, utils_1.padCurrencyValue)(
            // @ts-ignore
            `${testCase.balanceOutstanding}`);
        }
        // @ts-ignore
        if (testCase.accountNumber) {
            // @ts-ignore
            expected.account.number = `${testCase.accountNumber}`;
        }
        // @ts-ignore
        if (testCase.accountName) {
            // @ts-ignore
            expected.account.name = testCase.accountName;
        }
        const actual = (0, engine_1.getTransactionInfo)(testCase.message, 'ICICI');
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsZ0RBQWdEO0FBQ2hELDhDQUF1QjtBQUV2QiwwQ0FBbUQ7QUFFbkQsd0NBQWdFO0FBRWhFLHNFQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNyQixhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsYUFBYTtJQUNiLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNYLGFBQWE7SUFDYixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDWCxhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsY0FBYztJQUNkLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztJQUNkLFlBQVk7SUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDWixrQkFBa0I7SUFDbEIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLGNBQWM7SUFDZCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7SUFDbEIsZUFBZTtJQUNmLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNaLGlCQUFpQjtJQUNqQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxlQUFlO0lBQ2YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2Isd0NBQXdDO0lBQ3hDLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDO0lBQzdDLCtCQUErQjtJQUMvQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7SUFDckIsZ0NBQWdDO0lBQ2hDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNoQiwyQkFBMkI7SUFDM0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNqQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDaEIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0NBQ3ZCLENBQUMsQ0FBQztBQUVILElBQUEsc0JBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUV2Qix3QkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwQyxJQUFBLGFBQUksRUFBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFFBQVEsR0FBcUI7WUFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUEyQixFQUFFO1lBQ3ZELGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQzNDLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxFQUFFO1lBQ04sZUFBZSxFQUFFLFFBQVEsQ0FBQyxlQUEwQztZQUNwRSxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7U0FDNUIsQ0FBQztRQUVGLFFBQVEsQ0FBQyxPQUFPLEdBQUc7WUFDakIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxFQUFFO1NBQ1AsQ0FBQztRQUVGLGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFBLHdCQUFnQjtZQUM3QyxhQUFhO1lBQ2IsR0FBRyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FDakMsQ0FBQztTQUNIO1FBRUQsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMxQixhQUFhO1lBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdkQ7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBQSwyQkFBa0IsRUFBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTdELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==