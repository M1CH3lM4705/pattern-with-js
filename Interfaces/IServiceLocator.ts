export default interface IServiceLocator {
  register(instance: any): void;
  get(instance: string): any;
}