import BaseMenuView from "./BaseMenuView.js";
import AppError from "../ErrorHandler/AppError.js";

export default class MainMenuView extends BaseMenuView {

  constructor({ serviceLocator }) {
    super({serviceLocator: serviceLocator})
  }

  static init(obj) {
    return new MainMenuView(obj)
  }

  getAction(command) {
    const method = {
      '1': { view: 'IaView', mt: 'view' },
      '2': { view: 'UserView', mt: 'view' }
    }

    if (!method[command])
      throw new AppError("comando não encontrado", 'UserFriendlyErrorStrategy');

    return method[command]
      ;
  }

  options() {
    return [
      '1 - IA',
      '2 - Crud Usuários',
      'Para finalizar digite "Sair"\n'
    ]
  }


  async executeMethod(method, service) {
    
        const { view, mt } = method;

        const sv = this.serviceLocator.get(view);

        await sv[mt]();
    
  }

}