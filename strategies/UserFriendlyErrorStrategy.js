import ErroBaseStrategy from "./ErroBaseStrategy.js";

export default class UserFriendlyErrorStrategy extends ErroBaseStrategy {
  handle(error) {
    super.handle(`[Erro]: ${error.message}`);
  }
}