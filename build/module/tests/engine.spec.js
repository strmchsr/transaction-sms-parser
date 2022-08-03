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
        const actual = getTransactionInfo(testCase.message);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRCxPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFFBQVEsR0FBcUI7WUFDakMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUEyQixFQUFFO1lBQ3ZELGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNuRCxDQUFDLENBQUMsRUFBRTtZQUNOLGVBQWUsRUFBRSxRQUFRLENBQUMsZUFBMEM7U0FDckUsQ0FBQztRQUVGLFFBQVEsQ0FBQyxPQUFPLEdBQUc7WUFDakIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNsRCxDQUFDLENBQUMsRUFBRTtTQUNQLENBQUM7UUFFRixhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCO1lBQzdDLGFBQWE7WUFDYixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUNqQyxDQUFDO1NBQ0g7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2RDtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDeEIsYUFBYTtZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9