import UserFriendlyErrorStrategy from "../strategies/UserFriendlyErrorStrategy.js"
import ValidationErrorStrategy from '../strategies/ValidationErrorStrategy.js'
import GenericErrorStrategy from '../strategies/GenericErrorStrategy.js'

export default class ErrorHandler{
  constructor(){
    this.strategies = {
      'UseFriendlyError': new UserFriendlyErrorStrategy(),
      'ValidationError': new ValidationErrorStrategy(),

    }
    this.defaulStrategy = new GenericErrorStrategy()
  }

  handle(error){
    const strategy = this.strategies[error.type] || this.defaulStrategy;
    strategy.handle(error);
  }
}