/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { getTransactionInfo } from '../lib/engine';
import { padCurrencyValue } from '../lib/utils';
import testCases from './testCases.json';
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
        const actual = getTransactionInfo(testCase.message, 'ICICI', REGEXP);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRCxPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNyQixhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsYUFBYTtJQUNiLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNYLGFBQWE7SUFDYixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7SUFDWCxhQUFhO0lBQ2IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0lBQ1gsY0FBYztJQUNkLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztJQUNkLFlBQVk7SUFDWixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7SUFDWixrQkFBa0I7SUFDbEIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0lBQ2hCLGNBQWM7SUFDZCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7SUFDbEIsZUFBZTtJQUNmLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztJQUNaLGlCQUFpQjtJQUNqQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDZCxlQUFlO0lBQ2YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBQ2Isd0NBQXdDO0lBQ3hDLENBQUMscUNBQXFDLEVBQUUsSUFBSSxDQUFDO0lBQzdDLCtCQUErQjtJQUMvQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7SUFDckIsZ0NBQWdDO0lBQ2hDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNoQiwyQkFBMkI7SUFDM0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNqQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDaEIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0NBQ3ZCLENBQUMsQ0FBQztBQUVILFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDcEMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sUUFBUSxHQUFxQjtZQUNqQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQTJCLEVBQUU7WUFDdkQsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQjtnQkFDM0MsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxFQUFFO1lBQ04sZUFBZSxFQUFFLFFBQVEsQ0FBQyxlQUEwQztZQUNwRSxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7U0FDNUIsQ0FBQztRQUVGLFFBQVEsQ0FBQyxPQUFPLEdBQUc7WUFDakIsU0FBUyxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0I7Z0JBQ2xDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNsRCxDQUFDLENBQUMsRUFBRTtTQUNQLENBQUM7UUFFRixhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCO1lBQzdDLGFBQWE7WUFDYixHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUNqQyxDQUFDO1NBQ0g7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzFCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN2RDtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDeEIsYUFBYTtZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDOUM7UUFFRCxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=