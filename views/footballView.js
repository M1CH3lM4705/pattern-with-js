import AppError from "../ErrorHandler/AppError.js";
import BaseMenuView from "./BaseMenuView.js";

export default class FootballView extends BaseMenuView {
  constructor(params) {
    super({ ...params, nameService: 'FootballService' })
  }

  static init(obj) {
    return new FootballView(obj);
  }

  getAction(command) {
    const method = {
      'BSA': ['getLeague', 'BSA'],
      'BL1': ['getLeague', 'BL1'],
      'DED': ['getLeague', 'DED'],
      'PD': ['getLeague', 'PD']
    }

    if (!method[command.toUpperCase()])
      throw new AppError("comando não encontrado", "UserFriendlyErrorStrategy");

    return method[command.toUpperCase()];
  }

  options() {
    return [
      'BSA - Para Brasileirão',
      'BL1 - Para Bundesliga (Alemão)',
      'DED - Para Eredivisie (Holandes)',
      'PD - Para Primeira Liga (Espanhol)',
      'Para finalizar digite "Sair"\n'
    ]
  }

  async executeMethod(method) {
    const [mt, command] = method;

    const service = this.serviceLocator.get(this.nameService);

    service[mt](command);
  }
}
