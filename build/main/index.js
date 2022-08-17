"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsParser = void 0;
const account_1 = require("./lib/account");
const balance_1 = __importDefault(require("./lib/balance"));
const utils_1 = require("./lib/utils");
__exportStar(require("./lib/engine"), exports);
const smsParser = (regexParserMap) => {
    (0, utils_1.setRegexParser)(regexParserMap);
};
smsParser.prototype.getAccountInfo = account_1.getAccount;
smsParser.prototype.getBalanceInfo = balance_1.default;
smsParser.prototype.getBankNameInfo = account_1.getBankName;
exports.SmsParser = smsParser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd0Q7QUFDeEQsNERBQXVDO0FBQ3ZDLHVDQUE2QztBQUU3QywrQ0FBNkI7QUFDN0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxjQUFtQyxFQUFFLEVBQUU7SUFDdEQsSUFBQSxzQkFBYyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLFNBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLG9CQUFVLENBQUM7QUFDaEQsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsaUJBQVUsQ0FBQztBQUNoRCxTQUFTLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxxQkFBVyxDQUFDO0FBRXJDLFFBQUEsU0FBUyxHQUFHLFNBQVMsQ0FBQyJ9