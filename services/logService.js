export default class LoggerService {
    log(message) {
        if (typeof message === 'object') {
            console.log(message, '\n')
            return;
        }
        console.log(`Log: ${message} \n`);
    }

    dir(message) {
        console.dir(message)
    }
}