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
export const bankKeywords = [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBNkIsTUFBTSxhQUFhLENBQUM7QUFFdEUsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxRQUFRO0lBQ1IsZUFBZTtJQUNmLFNBQVM7SUFDVCxpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGFBQWE7SUFDYixLQUFLO0lBQ0wsU0FBUztDQUNWLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTFELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBZ0I7SUFDdkM7UUFDRSxHQUFHLEVBQUUsUUFBUTtRQUNiLFFBQVEsRUFBRSxnQkFBZ0I7S0FDM0I7SUFDRDtRQUNFLEdBQUcsRUFBRSxRQUFRO1FBQ2IsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQztJQUNEO1FBQ0UsR0FBRyxFQUFFLEtBQUs7UUFDVixRQUFRLEVBQUUscUJBQXFCO0tBQ2hDO0lBQ0Q7UUFDRSxHQUFHLEVBQUUsTUFBTTtRQUNYLFFBQVEsRUFBRSxtQkFBbUI7S0FDOUI7SUFDRDtRQUNFLEdBQUcsRUFBRSxNQUFNO1FBQ1gsUUFBUSxFQUFFLFdBQVc7S0FDdEI7SUFDRDtRQUNFLEdBQUcsRUFBRSxLQUFLO1FBQ1YsUUFBUSxFQUFFLGdCQUFnQjtLQUMzQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLEtBQUs7UUFDVixRQUFRLEVBQUUsS0FBSztLQUNoQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE9BQU87UUFDWixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtJQUNEO1FBQ0UsR0FBRyxFQUFFLE1BQU07UUFDWCxRQUFRLEVBQUUsTUFBTTtLQUNqQjtDQUNGLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxhQUFhLEdBQXFCO0lBQzdDO1FBQ0UsS0FBSyxFQUFFLGVBQWU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7S0FDeEI7SUFDRDtRQUNFLEtBQUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxZQUFZLENBQUMsTUFBTTtLQUMxQjtJQUNEO1FBQ0UsS0FBSyxFQUFFLFlBQVk7UUFDbkIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO0tBQ3hCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxZQUFZLENBQUMsT0FBTztLQUMzQjtJQUNEO1FBQ0UsS0FBSyxFQUFFLGNBQWM7UUFDckIsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO0tBQ3hCO0NBQ0YsQ0FBQyJ9