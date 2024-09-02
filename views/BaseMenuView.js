export default class BaseMenuView {
  #command = '';

  constructor({ serviceLocator, nameService }) {
    this.serviceLocator = serviceLocator;
    this.console = this.serviceLocator.get('Console');
    this.nameService = nameService || '';
  }

  static init(obj) {
    return new BaseMenuView(obj)
  }

  async executeMethod(method, service) {
    try {
      if (typeof method === 'object') {
        const [mt, questions] = method;
        const args = [];

        const questionsArray = Array.isArray(questions) ? questions : [questions];

        for (const question of questionsArray) {
          const answer = await this.console.prompt(`${question}: `);
          args.push(answer);
        }

        await service[mt](...args);
      } else {
        await service[method]();
      }
    } catch (error) {
      this.serviceLocator.get('ErrorManager').capture(error);
    }
  }

  getAction(command) {
    throw new Error('selectedMethod deve ser implementado na subclasse');
  }

  options() {
    throw new Error('options deve ser implementado na subclasse');
  }

  async #menuView() {
    this.console.writeLine('Selecione uma opção:\n');
    this.options().forEach(text => this.console.writeLine(text));
    this.#command = await this.console.prompt('Digite o valor: ');
  }

  async view() {
    const service = this.nameService ? this.serviceLocator.get(this.nameService) : '';
    do {
      await this.#menuView();

      if (this.#command === 'Sair')
        break;

      const method = this.getAction(this.#command);
      await this.executeMethod(method, service);

    } while (this.#command !== 'Sair');

  }

  close() {
    this.console.close();
  }
}