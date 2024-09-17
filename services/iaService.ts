import AppError from '../ErrorHandler/AppError.js';
import StringExtension from '../Extensions/StringExstension.js';
import GeminiClient from '../HttpClients/GeminiClient.js';
import IIaService from '../Interfaces/IIaService.js';
import ILoggerService from '../Interfaces/ILoggerService.js';
import IServiceLocator from '../Interfaces/IServiceLocator.js';
import CareTaker from '../Memento/CareTaker.js';
import History from '../Memento/History.js';
import Message from '../Memento/Message.js';

type IaProps = {
  serviceLocator: IServiceLocator;
}

export default class IaService implements IIaService {
  private readonly serviceLocator: IServiceLocator;
  private readonly loggerService: ILoggerService;
  private readonly geminiClient: GeminiClient;
  private readonly history: History
  private readonly careTaker: CareTaker;

  constructor({ serviceLocator }: IaProps) {
    this.serviceLocator = serviceLocator
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.geminiClient = this.serviceLocator.get('GeminiClient');
    this.history = this.serviceLocator.get('History');
    this.careTaker = this.serviceLocator.get('CareTaker');
  }

  static init(obj: IaProps) {
    return new IaService(obj)
  }

  async getQuestion(prompt: string): Promise<string> {
    if (!prompt) {
      throw new AppError('Conteúdo da pergunta vazío.', 'UserFriendlyError')
    }

    const context = this.history.messages.length ? `${this.history.getFullConversation()}. ${prompt}` : prompt;

    const text = await this.geminiClient.getPrompt(context);

    const lines = StringExtension.parsedMarkdown(text);

    this.history.addMessage(new Message(prompt, lines))
    this.careTaker.save(this.history);

    return lines;
  }

}