import ILoggerService from '../Interfaces/ILoggerService';

export default class LoggerService implements ILoggerService {
    log(message: string | object): void {
        if (typeof message === 'object') {
            console.log(message, '\n')
            return;
        }
        console.log(`Log: ${message} \n`);
    }

    dir(message: string): void {
        console.dir(message)
    }
}