import AppError from "../ErrorHandler/AppError.js";
import LoggerService from "../services/logService.js";

export default class ErroBaseStrategy{
    #danger = '\x1b[31m';
    #resetColor = '\x1b[0m';
    constructor(){
        if(new.target === ErroBaseStrategy){
            throw new AppError("Não é possivel instancia uma classe abstrata")
        }
    }

    handle(message){
        new LoggerService().log(`${this.#danger}${message}${this.#resetColor}`)
    }
}