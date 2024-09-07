import BaseMenuView from "./BaseMenuView.js";

export default class WeatherView extends BaseMenuView {
  constructor(params) {
    super({ ...params, nameService: 'WeatherService' })
  }

  static init(obj) {
    return new this(obj);
  }

  getAction(command) {
    const method = {
      '1': 'getWeather',
    }

    if (!method[command])
      throw new AppError("comando não encontrado", 'UserFriendlyError');

    return method[command]
      ;
  }

  options() {
    return [
      '1 - Para consultar clima\n',
      'Para finalizar digite "Sair"\n'
    ]
  }
}