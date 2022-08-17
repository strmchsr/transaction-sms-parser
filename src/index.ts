import { getTransactionInfo } from './lib/engine';

export * from './lib/engine';

function SmsParser(regexParserMap: Map<RegExp, string>) {
    this.getAccountInfo = (message: string, sender: string) => {
        return getTransactionInfo(message, sender, regexParserMap);
    }
};

export default SmsParser;
