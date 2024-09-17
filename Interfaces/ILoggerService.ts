export default interface ILoggerService {
  log(message: string | object): void;
  dir(message: string): void;
}