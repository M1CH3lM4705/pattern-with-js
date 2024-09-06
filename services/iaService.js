import AppError from '../ErrorHandler/AppError.js';
import StringExtension from '../Extensions/StringExstension.js';

export default class IaService {
  constructor({ serviceLocator }) {
    this.ServiceLocator = serviceLocator
    this.LoggerService = this.ServiceLocator.get('LoggerService');
    this.GeminiClient = this.ServiceLocator.get('GeminiClient');
  }

  static init(obj) {
    return new IaService(obj)
  }

  async getQuestion(prompt) {
    if (!prompt) {
      throw new AppError('Conteúdo da pergunta vazío.', 'UserFriendlyErrorStrategy')
    }

    const text = await this.GeminiClient.getPrompt(prompt);

    const lines = StringExtension.parsedMarkdown(text);

    lines.forEach((line) => {
      this.LoggerService.log(line)
    })
  }

}