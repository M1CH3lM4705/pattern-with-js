import AppError from "../ErrorHandler/AppError.js";

export default class UserView {
  #nameService = 'UserService';
  #command = '';
  constructor(console, serviceLocator) {
    this.Console = console;
    this.ServiceLocator = serviceLocator;
  }

  selectedMethod(command) {
    const method = {
      '1': 'getUsers',
      '2': ['getUserId', 'Digite o id do usuário '],
      '3': ['createUser', ['Digite o nome ', 'Digite a idade ']],
      '4': ['updateUser', ['Digite o id do usuário ','Digite o nome ', 'Digite a idade ']],
      '5': ['deleteUser', 'Digite o id do usuário ']
    }

    if (!method[command])
      throw new AppError("comando não encontrado");

    return method[command]
      ;
  }

  #options() {
    return [
      '1 - Consultar todos os usuários',
      '2 - Consulta usuário pelo seu id',
      '3 - Cadastrar usuário',
      '4 - Atualizar usuário',
      '5 - Remover usuário',
      'Para finalizar digite "Sair"\n'
    ]
  }

  async #menuUserView() {

    this.Console.writeLine('Bem vindo\n');
    this.Console.writeLine('Selecione uma opção:\n')
    this.#options().forEach(text => this.Console.writeLine(text))
    this.#command = await this.Console.prompt('Digite o valor: ');
  }

  async executeMethod(method, service) {
    try {
      if (typeof method === 'object') {
        const [mt, questions] = method;
        const args = [];
  
        const questionsArray = Array.isArray(questions) ? questions : [questions];
  
        for (const question of questionsArray) {
          const answer = await this.Console.prompt(`${question}: `);
          args.push(answer);
        }
        
        await service[mt](...args);
      } else {
        await service[method]();
      }
    } catch (error) {
      this.ServiceLocator.get('ErrorManager').capture(error);
    }
  }

  async view() {
    const service = this.ServiceLocator.get(this.#nameService)
    do {

      await this.#menuUserView();

      if(this.#command === 'Sair')
        break;

      const method = this.selectedMethod(this.#command);

      await this.executeMethod(method, service);

    } while (this.#command != 'Sair');

    this.Console.close();
  }
}