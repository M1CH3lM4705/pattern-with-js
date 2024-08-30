export default class AppError extends Error {
  constructor(message, statusCode = 500, userFriendlyMessage = "Ocorreu um erro. Tente novamente mais tarde. \n") {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode; // Código de status HTTP ou código de erro personalizado
    this.userFriendlyMessage = userFriendlyMessage; // Mensagem amigável para o usuário
    Error.captureStackTrace(this, this.constructor);
  }
}