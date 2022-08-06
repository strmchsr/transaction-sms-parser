/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { getTransactionInfo } from '../lib/engine';
import { padCurrencyValue } from '../lib/utils';
import testCases from './testCases.json';
testCases.forEach((testCase, index) => {
    test(`${testCase.name}-${index}`, (t) => {
        const expected = {
            account: { type: testCase.accountType },
            transactionAmount: testCase.transactionAmount
                ? padCurrencyValue(`${testCase.transactionAmount}`)
                : '',
            transactionType: testCase.transactionType,
            bankName: testCase.bankName,
        };
        expected.balance = {
            available: testCase.balanceAvailable
                ? padCurrencyValue(`${testCase.balanceAvailable}`)
                : '',
        };
        // @ts-ignore
        if (testCase.balanceoutstanding) {
            expected.balance.outstanding = padCurrencyValue(
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
        const actual = getTransactionInfo(testCase.message, 'ICICI');
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRCxPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFFBQVEsR0FBcUI7WUFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUEyQixFQUFFO1lBQ3ZELGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsRUFBRTtZQUNOLGVBQWUsRUFBRSxRQUFRLENBQUMsZUFBMEM7WUFDcEUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO1NBQzVCLENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxHQUFHO1lBQ2pCLFNBQVMsRUFBRSxRQUFRLENBQUMsZ0JBQWdCO2dCQUNsQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtZQUM3QyxhQUFhO1lBQ2IsR0FBRyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FDakMsQ0FBQztTQUNIO1FBRUQsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMxQixhQUFhO1lBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdkQ7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU3RCxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=