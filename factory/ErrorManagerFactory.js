import ErrorManager from "../Observer/ErrorManager.js";
import UserFriendlyErrorStrategy from '../strategies/UserFriendlyErrorStrategy.js'
import ValidationErrorStrategy from '../strategies/ValidationErrorStrategy.js'
import GenericErrorStrategy from '../strategies/GenericErrorStrategy.js'

export default class ErrorManagerFactory{
  static createDefaultErrorManager(){
    const errorManager = new ErrorManager();
    
    errorManager.subscribe(new UserFriendlyErrorStrategy());
    errorManager.subscribe(new ValidationErrorStrategy());
    errorManager.subscribe(new GenericErrorStrategy());

    return errorManager;
  }
}