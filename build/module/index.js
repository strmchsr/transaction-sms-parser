import { getTransactionInfo } from './lib/engine';
export * from './lib/engine';
function SmsParser(regexParserMap) {
    this.getAccountInfo = (message, sender) => {
        return getTransactionInfo(message, sender, regexParserMap);
    };
}
;
export default SmsParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRWxELGNBQWMsY0FBYyxDQUFDO0FBRTdCLFNBQVMsU0FBUyxDQUFDLGNBQW1DO0lBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDdEQsT0FBTyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQTtBQUNMLENBQUM7QUFBQSxDQUFDO0FBRUYsZUFBZSxTQUFTLENBQUMifQ==