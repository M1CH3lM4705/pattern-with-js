import ErroBaseStrategy from "./ErroBaseStrategy.js";

export default class ValidationErrorStrategy extends ErroBaseStrategy{
  handle(error){
    super.handle(`Validação falhou: ${error.message}`);
  }
}