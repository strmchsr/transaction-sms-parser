import { IAccountType } from './interface';
export const availableBalanceKeywords = [
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
export const outstandingBalanceKeywords = ['outstanding'];
export const wallets = ['paytm', 'simpl', 'lazypay', 'amazon_pay'];
export const combinedWords = [
    {
        regex: /credit\scard/g,
        word: 'c_card',
        type: IAccountType.CARD,
    },
    {
        regex: /amazon\spay/g,
        word: 'amazon_pay',
        type: IAccountType.WALLET,
    },
    {
        regex: /uni\scard/g,
        word: 'uni_card',
        type: IAccountType.CARD,
    },
    {
        regex: /niyo\scard/g,
        word: 'niyo',
        type: IAccountType.ACCOUNT,
    },
    {
        regex: /slice\scard/g,
        word: 'slice_card',
        type: IAccountType.CARD,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFFM0QsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsZUFBZTtJQUNmLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGFBQWE7SUFDYixLQUFLO0lBQ0wsU0FBUztDQUNWLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBcUI7SUFDN0M7UUFDRSxLQUFLLEVBQUUsZUFBZTtRQUN0QixJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtLQUN4QjtJQUNEO1FBQ0UsS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLFlBQVksQ0FBQyxNQUFNO0tBQzFCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7S0FDeEI7SUFDRDtRQUNFLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPO0tBQzNCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7S0FDeEI7Q0FDRixDQUFDIn0=