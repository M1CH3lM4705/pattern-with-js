import AppError from "../ErrorHandler/AppError.js";
import IServiceLocatorcator from "../Interfaces/IServiceLocator.js";
import { MethodType } from "../Interfaces/types/MethodType.js";
import BaseMenuView from "./BaseMenuView.js";

type IaViewProps = {
  serviceLocator: IServiceLocatorcator;
}

export default class IaView extends BaseMenuView {

  constructor(params: IaViewProps) {
    super({ ...params, nameService: 'IaService' })
  }

  static init(obj: IaViewProps) {
    return new IaView(obj);
  }

  getAction(command: string): [string, string[]] {
    const method: Record<string, MethodType> = {
      '1': ['getQuestion', 'Digite a pergunta '],
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
      '1 - Faça uma pergunta à IA',
      'Para finalizar digite "Sair"\n'
    ]
  }
}