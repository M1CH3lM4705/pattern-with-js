export default class AppError extends Error {
  constructor(message, type='GenericError', statusCode = 500) {
    super(message);
    this.type = type;
    this.statusCode = statusCode; // Código de status HTTP ou código de erro personalizado
    
    Error.captureStackTrace(this, this.constructor);
  }
}