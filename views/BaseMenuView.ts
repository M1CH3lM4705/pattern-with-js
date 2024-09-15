import IServiceLocator from "../Interfaces/IServiceLocator";
import LoggerService from "../services/logService";
import Console from "./console";

export type BaseMenuViewProps = {
  serviceLocator: IServiceLocator;
  nameService: string;
}

export default class BaseMenuView {
  private _command: string = '';
  private readonly serviceLocator: IServiceLocator;
  private readonly console: Console;
  private readonly logger: LoggerService;
  private nameService: string = '';

  constructor({ serviceLocator, nameService }: BaseMenuViewProps) {
    this.serviceLocator = serviceLocator;
    this.console = this.serviceLocator.get('Console');
    this.logger = this.serviceLocator.get('LoggerService');
    this.nameService = nameService;
  }

  static init(obj: BaseMenuViewProps) {
    return new BaseMenuView(obj)
  }

  async executeMethod(method: string | [string, string[]], service: Record<string, (...args: any[]) => any>) {
    try {
      if (typeof method === 'object') {
        const [mt, questions] = method;
        const args = [];

        const questionsArray = Array.isArray(questions) ? questions : [questions];

        for (const question of questionsArray) {
          const answer = await this.console.prompt(`${question}: `);
          this.console.writeLine('');
          args.push(answer);
        }

        this.console.writeLine(await service[mt](...args));
      } else {
        this.console.writeLine(await service[method]());
      }
    } catch (error) {
      this.serviceLocator.get('ErrorManager').capture(error);
    }
  }

  getAction(command: string): [string, string[]] {
    throw new Error('selectedMethod deve ser implementado na subclasse');
  }

  options(): Array<string> {
    throw new Error('options deve ser implementado na subclasse');
  }

  async #menuView() {
    this.console.writeLine('\nSelecione uma opção:\n');
    this.options().forEach(text => this.console.writeLine(text));
    this._command = await this.console.prompt('Digite o valor: ');
  }

  async view() {
    const service = this.nameService ? this.serviceLocator.get(this.nameService) : '';
    do {
      await this.#menuView();

      if (this._command.toLowerCase() === 'Sair'.toLowerCase())
        break;

      const method = this.getAction(this._command);
      await this.executeMethod(method, service);

    } while (this._command.toLowerCase() !== 'Sair'.toLowerCase());

  }

  close() {
    this.console.close();
  }
}