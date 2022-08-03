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
testCases_json_1.default.forEach((testCase, index) => {
    (0, ava_1.default)(`${testCase.name}-${index}`, (t) => {
        const expected = {
            account: { type: testCase.accountType },
            transactionAmount: testCase.transactionAmount
                ? (0, utils_1.padCurrencyValue)(`${testCase.transactionAmount}`)
                : '',
            transactionType: testCase.transactionType,
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
        const actual = (0, engine_1.getTransactionInfo)(testCase.message);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsZ0RBQWdEO0FBQ2hELDhDQUF1QjtBQUV2QiwwQ0FBbUQ7QUFFbkQsd0NBQWdEO0FBRWhELHNFQUF5QztBQUV6Qyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwQyxJQUFBLGFBQUksRUFBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFFBQVEsR0FBcUI7WUFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUEyQixFQUFFO1lBQ3ZELGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQzNDLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxFQUFFO1lBQ04sZUFBZSxFQUFFLFFBQVEsQ0FBQyxlQUEwQztTQUNyRSxDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRztZQUNqQixTQUFTLEVBQUUsUUFBUSxDQUFDLGdCQUFnQjtnQkFDbEMsQ0FBQyxDQUFDLElBQUEsd0JBQWdCLEVBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUEsd0JBQWdCO1lBQzdDLGFBQWE7WUFDYixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUNqQyxDQUFDO1NBQ0g7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2RDtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDeEIsYUFBYTtZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDJCQUFrQixFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwRCxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=