import AppError from "../ErrorHandler/AppError.js";
import BaseMenuView from "./BaseMenuView.js";

export default class UserView extends BaseMenuView {

  constructor(params) {
    super({ ...params, nameService: 'UserService' })
  }

  static init(obj){
    return new UserView(obj);
  }

  getAction(command) {
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

  options() {
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