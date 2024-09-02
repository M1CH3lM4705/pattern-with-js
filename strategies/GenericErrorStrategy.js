import ErroBaseStrategy from "./ErroBaseStrategy.js";

export default class GenericErrorStrategy extends ErroBaseStrategy {
  handle(_error) {
    super.handle(`Ocorreu um erro inesperado. Por favor, tente novamente. \n`);
  }
}