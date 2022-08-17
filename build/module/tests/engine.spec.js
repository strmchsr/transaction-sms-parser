/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { getTransactionInfo } from '../lib/engine';
import { padCurrencyValue, setRegexParser } from '../lib/utils';
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
setRegexParser(REGEXP);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFaEUsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFFekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDckIsYUFBYTtJQUNiLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNYLGFBQWE7SUFDYixDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7SUFDWCxhQUFhO0lBQ2IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO0lBQ1gsYUFBYTtJQUNiLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztJQUNYLGNBQWM7SUFDZCxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7SUFDZCxZQUFZO0lBQ1osQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO0lBQ1osa0JBQWtCO0lBQ2xCLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztJQUNoQixjQUFjO0lBQ2QsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO0lBQ2xCLGVBQWU7SUFDZixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7SUFDWixpQkFBaUI7SUFDakIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQ2QsZUFBZTtJQUNmLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztJQUNiLHdDQUF3QztJQUN4QyxDQUFDLHFDQUFxQyxFQUFFLElBQUksQ0FBQztJQUM3QywrQkFBK0I7SUFDL0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDO0lBQ3JCLGdDQUFnQztJQUNoQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDaEIsMkJBQTJCO0lBQzNCLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztJQUN0QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDakIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBQ2hCLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQztDQUN2QixDQUFDLENBQUM7QUFFSCxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxRQUFRLEdBQXFCO1lBQ2pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsV0FBMkIsRUFBRTtZQUN2RCxpQkFBaUIsRUFBRSxRQUFRLENBQUMsaUJBQWlCO2dCQUMzQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLEVBQUU7WUFDTixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQTBDO1lBQ3BFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUTtTQUM1QixDQUFDO1FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRztZQUNqQixTQUFTLEVBQUUsUUFBUSxDQUFDLGdCQUFnQjtnQkFDbEMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxFQUFFO1NBQ1AsQ0FBQztRQUVGLGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxnQkFBZ0I7WUFDN0MsYUFBYTtZQUNiLEdBQUcsUUFBUSxDQUFDLGtCQUFrQixFQUFFLENBQ2pDLENBQUM7U0FDSDtRQUVELGFBQWE7UUFDYixJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDMUIsYUFBYTtZQUNiLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3ZEO1FBRUQsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUN4QixhQUFhO1lBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUM5QztRQUVELE1BQU0sTUFBTSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFN0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9