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
      '2': ['getStandings', this.league],
      '3': ['getTeams', this.league, ['getMatchsTeam', 'Digite o id do time: ']],
    };

    if (!method[command])
      throw new AppError("Comando não encontrado", "UserFriendlyError");

    return method[command];
  }

  options() {
    return [
      '1 - Para obter as partidas',
      '2 - Para obter a tabela de classificação',
      '3 - Para obter as partidas de um time\n',
      'Para finalizar digite "Sair"\n'
    ];
  }

  async executeMethod(method) {
    let [mt, command, arr] = method;
    const service = this.serviceLocator.get(this.nameService);
    const singleton = this.serviceLocator.get('TeamsSingleton');

    if (arr) {

      await service[mt](command);
      const [met, question] = arr;
      mt = met;
      this.console.writeLine(singleton.getTeams() + '\n')
      command = await this.console.prompt(question);
      this.console.writeLine('');
    }


    const stringStream = await service[mt](command);

    if (stringStream instanceof Array) {
      stringStream.forEach(s => console.log(s))
      return;
    }
    console.log(stringStream);
  }
}