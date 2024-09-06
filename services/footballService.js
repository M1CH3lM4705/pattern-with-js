import '../Config/dotenvConfig.js';
import StringExtension from '../Extensions/StringExstension.js';
import PromptAi from '../Helpers/promptIa.js';
import ResponseFootbal from '../models/FootballModels/ResponseFootball.js';
import Standing from '../models/FootballModels/Standing.js';

export default class FootballService {
  constructor({ serviceLocator, httpClient }) {
    this.serviceLocator = serviceLocator;
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.httpClient = httpClient;
    this.ai = this.serviceLocator.get('GeminiClient');

    this.headers = {
      'X-Auth-Token': process.env.FOOTBAL_TOKEN
    }
  }

  static init(obj) {
    return new FootballService(obj);
  }

  async getLeague(league) {
    this.loggerService.log('Aguarde... buscando partidas');
    const response = await this.httpClient.get(`/competitions/${league}/matches`, this.headers)

    const obj = ResponseFootbal.fromJSON(response);

    this.loggerService.dir(obj.matches);
  }

  async getStandings(league) {
    this.loggerService.log('Aguarde... buscando tabela de classificação');

    const response = await this.httpClient.get(`/competitions/${league}/standings`, this.headers);

    const obj = response.standings?.map(standing => Standing.fromJSON(standing));

    const prompt = PromptAi.promptClassification(obj[0].table);

    const text = await this.ai.getPrompt(prompt)

    const result = StringExtension.parsedMarkdown(text);

    this.loggerService.dir(result);
  }
}
