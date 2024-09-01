import ErrorManager from "../Observer/ErrorManager.js";
import ErrorHandler from "../ErrorHandler/ErrorHandler.js";

export default class ErrorManagerFactory{
  static createDefaultErrorManager(){
    const errorManager = new ErrorManager();
    
    errorManager.subscribe(new ErrorHandler());

    return errorManager;
  }
}