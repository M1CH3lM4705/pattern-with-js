import AppError from "../ErrorHandler/AppError.js";
import IServiceLocator from "../Interfaces/IServiceLocator.js";
import BaseMenuView from "./BaseMenuView.js";

type UserViewProps = {
  serviceLocator: IServiceLocator;
}

type MethodType = string | [string, string | string[]];

export default class UserView extends BaseMenuView {

  constructor(params: UserViewProps) {
    super({ ...params, nameService: 'UserService' })
  }

  static init(obj: UserViewProps) {
    return new UserView(obj);
  }

  getAction(command: string): [string, string[]] {
    const method: Record<string, MethodType> = {
      '1': 'getUsers',
      '2': ['getUserId', 'Digite o id do usuário '],
      '3': ['createUser', ['Digite o nome ', 'Digite a idade ']],
      '4': ['updateUser', ['Digite o id do usuário ', 'Digite o nome ', 'Digite a idade ']],
      '5': ['deleteUser', 'Digite o id do usuário ']
    }

    if (!method[command])
      throw new AppError("comando não encontrado");

    const action = method[command];

    if (typeof action === 'string') {
      return [action, []];
    }

    const [methodName, questions] = action;
    const questionsArray = Array.isArray(questions) ? questions : [questions];

    return [methodName, questionsArray];
  }

  options(): Array<string> {
    return [
      '1 - Consultar todos os usuários',
      '2 - Consulta usuário pelo seu id',
      '3 - Cadastrar usuário',
      '4 - Atualizar usuário',
      '5 - Remover usuário',
      'Para finalizar digite "Sair"\n'
    ]
  }
}