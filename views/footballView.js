import AppError from "../ErrorHandler/AppError.js";
import BaseMenuView from "./BaseMenuView.js";
import FootballSubmenuView from "./FootballSubmenuView.js";

export default class FootballView extends BaseMenuView {
  constructor(params) {
    super({ ...params, nameService: 'FootballService' })
  }

  static init(obj) {
    return new FootballView(obj);
  }

  getAction(command) {
    const method = {
      'BSA': ['BSA'],
      'BL1': ['BL1'],
      'DED': ['DED'],
      'PD': ['PD']
    }

    if (!method[command.toUpperCase()])
      throw new AppError("comando não encontrado", "UserFriendlyError");

    return method[command.toUpperCase()];
  }

  options() {
    return [
      'BSA - Para Brasileirão',
      'BL1 - Para Bundesliga (Alemão)',
      'DED - Para Eredivisie (Holandes)',
      'PD - Para Primeira Liga (Espanhol)',
      'PL - Para Premier League (Ingles)\n',
      'Para finalizar digite "Sair"\n'
    ]
  }

  async executeMethod(method) {
    const [command] = method;

    const service = FootballSubmenuView.init({
      serviceLocator: this.serviceLocator,
      nameService: this.nameService,
      league: command
    })

    await service.view();
  }
}
