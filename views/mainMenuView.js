import AppError from "../ErrorHandler/AppError.js";
import BaseMenuView from "./BaseMenuView.js";

export default class MainMenuView extends BaseMenuView {

  constructor({ serviceLocator }) {
    super({ serviceLocator: serviceLocator })
  }

  static init(obj) {
    return new MainMenuView(obj)
  }

  getAction(command) {
    const method = {
      '1': { view: 'IaView', mt: 'view' },
      '2': { view: 'UserView', mt: 'view' },
      '3': { view: 'FootballView', mt: 'view' },
      '4': { view: 'WeatherView', mt: 'view' }
    }

    if (!method[command])
      throw new AppError("comando não encontrado", 'UserFriendlyError');

    return method[command]
      ;
  }

  options() {
    return [
      '1 - IA',
      '2 - Crud Usuários',
      '3 - Futebol',
      '4 - Visualizar clima',
      'Para finalizar digite "Sair"\n'
    ]
  }


  async executeMethod(method, service) {

    const { view, mt } = method;

    const sv = this.serviceLocator.get(view);

    await sv[mt]();

  }

}