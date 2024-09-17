import '../Config/dotenvConfig.js';
import StringExtension from '../Extensions/StringExstension.js';
import PromptAi from '../Helpers/promptIa.js';
import GeminiClient from '../HttpClients/GeminiClient.js';
import IFootballService from '../Interfaces/IFootballService.js';
import IHttpClient from '../Interfaces/IHttpClient.js';
import ILoggerService from '../Interfaces/ILoggerService.js';
import IServiceLocator from '../Interfaces/IServiceLocator.js';
import ResponseFootball from '../models/FootballModels/ResponseFootball.js';
import Standing from '../models/FootballModels/Standing.js';
import TeamsSingleton from '../Singleton/TeamsSingleton.js';

type FootballProps = {
  serviceLocator: IServiceLocator;
  httpClient: IHttpClient;
}

export default class FootballService implements IFootballService {

  private readonly serviceLocator: IServiceLocator;
  private readonly loggerService: ILoggerService;
  private readonly httpClient: IHttpClient;
  private readonly ai: GeminiClient;
  private readonly singleton: TeamsSingleton;
  private headers: Record<string, string | undefined>;

  constructor({ serviceLocator, httpClient }: FootballProps) {
    this.serviceLocator = serviceLocator;
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.httpClient = httpClient;
    this.ai = this.serviceLocator.get('GeminiClient');
    this.singleton = this.serviceLocator.get('TeamsSingleton')

    this.headers = {
      'X-Auth-Token': process.env.FOOTBAL_TOKEN
    }
  }

  static init(obj: FootballProps) {
    return new FootballService(obj);
  }

  private async getLeagues(league: string): Promise<ResponseFootball> {
    const response = await this.httpClient.get(`/competitions/${league}/matches`, this.headers);

    const listFootball = ResponseFootball.fromJSON(response);

    return await this.getMatchs(league, listFootball.currentMatchDay);
  }

  async getLeague(league: string): Promise<string> {
    this.loggerService.log('Aguarde... buscando partidas');

    const obj = await this.getLeagues(league);

    const matchPromptTableString = PromptAi.promptMatches(obj.matchesShow());

    const text = await this.ai.getPrompt(matchPromptTableString);

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }

  async getTeams(league: string): Promise<void> {
    const obj = await this.getLeagues(league);

    obj.selectListTeams(league, this.singleton);
  }

  async getMatchs(league: string, currentMatchDay: number): Promise<ResponseFootball> {
    const response = await this.httpClient.get(`/competitions/${league}/matches?matchday=${currentMatchDay}`, this.headers)

    const obj = ResponseFootball.fromJSON(response);

    return obj;
  }

  async getStandings(league: string): Promise<string> {
    this.loggerService.log('Aguarde... buscando tabela de classificação');

    const response = await this.httpClient.get(`/competitions/${league}/standings`, this.headers);

    const obj = response.standings?.map((standing: Standing) => Standing.fromJSON(standing));

    const prompt = PromptAi.promptClassification(obj[0].table);

    const text = await this.ai.getPrompt(prompt)

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }

  async getMatchsTeam(id: number): Promise<string> {
    const response = await this.httpClient.get(`/teams/${id}/matches?status=SCHEDULED&limit=4`, this.headers);

    const listFootball = ResponseFootball.fromJSON(response);

    const matchPromptTableString = PromptAi.promptMatches(listFootball.matchesShow());

    const text = await this.ai.getPrompt(matchPromptTableString);

    const result = StringExtension.parsedMarkdown(text);

    return result;
  }
}
