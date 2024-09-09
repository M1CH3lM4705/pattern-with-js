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
    this.singleton = this.serviceLocator.get('TeamsSingleton')

    this.headers = {
      'X-Auth-Token': process.env.FOOTBAL_TOKEN
    }
  }

  static init(obj) {
    return new FootballService(obj);
  }

  async #getLeagues(league) {
    const response = await this.httpClient.get(`/competitions/${league}/matches`, this.headers);

    const listFootball = ResponseFootbal.fromJSON(response);

    return await this.getMatchs(league, listFootball.currentMatchDay);
  }

  async getLeague(league) {
    this.loggerService.log('Aguarde... buscando partidas');

    const obj = await this.#getLeagues(league);

    const matchPromptTableString = PromptAi.promptMatches(obj.matchesShow());

    const text = await this.ai.getPrompt(matchPromptTableString);

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }

  async getTeams(league) {
    const obj = await this.#getLeagues(league);

    obj.selectListTeams(league, this.singleton);
  }

  async getMatchs(league, currentMatchDay) {
    const response = await this.httpClient.get(`/competitions/${league}/matches?matchday=${currentMatchDay}`, this.headers)

    const obj = ResponseFootbal.fromJSON(response);

    return obj;
  }

  async getStandings(league) {
    this.loggerService.log('Aguarde... buscando tabela de classificação');

    const response = await this.httpClient.get(`/competitions/${league}/standings`, this.headers);

    const obj = response.standings?.map(standing => Standing.fromJSON(standing));

    const prompt = PromptAi.promptClassification(obj[0].table);

    const text = await this.ai.getPrompt(prompt)

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }

  async getMatchsTeam(id) {
    const response = await this.httpClient.get(`/teams/${id}/matches?status=SCHEDULED&limit=4`, this.headers);

    const listFootball = ResponseFootbal.fromJSON(response);

    const matchPromptTableString = PromptAi.promptMatches(listFootball.matchesShow());

    const text = await this.ai.getPrompt(matchPromptTableString);

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }
}
