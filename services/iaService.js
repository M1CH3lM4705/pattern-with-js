import AppError from '../ErrorHandler/AppError.js'

export default class IaService{
  constructor({serviceLocator}){
    this.ServiceLocator = serviceLocator
    this.LoggerService = this.ServiceLocator.get('LoggerService');
    this.GeminiClient = this.ServiceLocator.get('GeminiClient');
    this.marked = this.ServiceLocator.get('Marked');
  }

  static init(obj){
    return new IaService(obj)
  }

  async getQuestion(prompt){
    if(!prompt){
      throw new AppError('Conteúdo da pergunta vazío.', 'UserFriendlyErrorStrategy')
    }

    const text = await this.GeminiClient.getPrompt(prompt);

    const pureText = this.marked.converter(text);

    const lines = pureText.split('\n');

    lines.forEach((line) => {
      this.LoggerService.log(line)
    })
  }

}