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
        const actual = (0, engine_1.getTransactionInfo)(testCase.message, 'ICICI', REGEXP);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsZ0RBQWdEO0FBQ2hELDhDQUF1QjtBQUV2QiwwQ0FBbUQ7QUFFbkQsd0NBQWdEO0FBRWhELHNFQUF5QztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNyQixhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsYUFBYTtJQUNiLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNYLGFBQWE7SUFDYixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDWCxhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsY0FBYztJQUNkLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztJQUNkLFlBQVk7SUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDWixrQkFBa0I7SUFDbEIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLGNBQWM7SUFDZCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7SUFDbEIsZUFBZTtJQUNmLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNaLGlCQUFpQjtJQUNqQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxlQUFlO0lBQ2YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2Isd0NBQXdDO0lBQ3hDLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDO0lBQzdDLCtCQUErQjtJQUMvQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7SUFDckIsZ0NBQWdDO0lBQ2hDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNoQiwyQkFBMkI7SUFDM0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNqQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDaEIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0NBQ3ZCLENBQUMsQ0FBQztBQUVILHdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLElBQUEsYUFBSSxFQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sUUFBUSxHQUFxQjtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQTJCLEVBQUU7WUFDdkQsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQjtnQkFDM0MsQ0FBQyxDQUFDLElBQUEsd0JBQWdCLEVBQUMsR0FBRyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLEVBQUU7WUFDTixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQTBDO1lBQ3BFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtTQUM1QixDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRztZQUNqQixTQUFTLEVBQUUsUUFBUSxDQUFDLGdCQUFnQjtnQkFDbEMsQ0FBQyxDQUFDLElBQUEsd0JBQWdCLEVBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUEsd0JBQWdCO1lBQzdDLGFBQWE7WUFDYixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUNqQyxDQUFDO1NBQ0g7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2RDtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDeEIsYUFBYTtZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDJCQUFrQixFQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==