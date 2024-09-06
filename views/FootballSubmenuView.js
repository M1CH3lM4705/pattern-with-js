import BaseMenuView from "./BaseMenuView.js";

export default class FootballSubmenuView extends BaseMenuView {
  constructor(params) {
    super({ ...params, nameService: 'FootballService' })
    this.league = params.league
  }

  static init(obj) {
    return new FootballSubmenuView(obj);
  }

  getAction(command) {
    const method = {
      '1': ['getLeague', this.league],
      '2': ['getStandings', this.league]
    };

    if (!method[command])
      throw new AppError("Comando não encontrado", "UserFriendlyError");

    return method[command];
  }

  options() {
    return [
      '1 - Para obter a liga',
      '2 - Para obter a classificação',
      'Para finalizar digite "Sair"\n'
    ];
  }

  async executeMethod(method) {
    const [mt, command] = method;

    const service = this.serviceLocator.get(this.nameService);

    await service[mt](command);
  }
}