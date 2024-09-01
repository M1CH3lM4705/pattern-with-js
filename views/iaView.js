import AppError from "../ErrorHandler/AppError.js";
import BaseMenuView from "./BaseMenuView.js";

export default class IaView extends BaseMenuView{

  constructor(params){
    super({...params, nameService: 'IaService'})
  }

  static init(obj){
    return new IaView(obj);
  }

  getAction(command) {
    const method = {
      '1': ['getQuestion', 'Digite a pergunta '],
    }

    if (!method[command])
      throw new AppError("comando não encontrado");

    return method[command]
      ;
  }

  options() {
    return [
      '1 - Faça uma pergunta à IA',
      'Para finalizar digite "Sair"\n'
    ]
  }
}