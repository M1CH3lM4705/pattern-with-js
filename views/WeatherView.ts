import AppError from "../ErrorHandler/AppError.js";
import IServiceLocator from "../Interfaces/IServiceLocator.js";
import { MethodType } from "../Interfaces/types/MethodType.js";
import BaseMenuView from "./BaseMenuView.js";

type WeatherViewProps = {
  serviceLocator: IServiceLocator;
}

export default class WeatherView extends BaseMenuView {
  constructor(params: WeatherViewProps) {
    super({ ...params, nameService: 'WeatherService' })
  }

  static init(obj: WeatherViewProps): WeatherView {
    return new this(obj);
  }

  getAction(command: string): [string, string[]] {
    const method: Record<string, MethodType> = {
      '1': 'getWeather',
    }

    if (!method[command])
      throw new AppError("comando não encontrado", 'UserFriendlyError');

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
      '1 - Para consultar clima\n',
      'Para finalizar digite "Sair"\n'
    ]
  }
}