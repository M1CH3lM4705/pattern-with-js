import AppError from '../ErrorHandler/AppError.js';
import StringExtension from '../Extensions/StringExstension.js';
import Message from '../Memento/Message.js';

export default class IaService {
  constructor({ serviceLocator }) {
    this.ServiceLocator = serviceLocator
    this.LoggerService = this.ServiceLocator.get('LoggerService');
    this.GeminiClient = this.ServiceLocator.get('GeminiClient');
    this.history = this.ServiceLocator.get('History');
    this.careTaker = this.ServiceLocator.get('CareTaker');
  }

  static init(obj) {
    return new IaService(obj)
  }

  async getQuestion(prompt) {
    if (!prompt) {
      throw new AppError('Conteúdo da pergunta vazío.', 'UserFriendlyError')
    }

    const context = this.history.messages.length ? `${this.history.getFullConversation()}. ${prompt}` : prompt;

    const text = await this.GeminiClient.getPrompt(context);

    const lines = StringExtension.parsedMarkdown(text);

    this.history.addMessage(new Message(prompt, lines))
    this.careTaker.save(this.history);

    const [content] = lines

    return content;
  }

}