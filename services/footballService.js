import '../Config/dotenvConfig.js';

export default class FootballService {
  constructor({ serviceLocator, httpClient }) {
    this.serviceLocator = serviceLocator;
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.httpClient = httpClient;

    this.headers = {
      'X-Auth-Token': process.env.FOOTBAL_TOKEN
    }
  }

  static init(obj) {
    return new FootballService(obj);
  }

  async getLeague(league) {
    this.loggerService.log('Executando função getLeague');
    const response = await this.httpClient.get(`/competitions/${league}/matches?season='2024'&limit=10`, this.headers)

    this.loggerService.log(response);
  }
}
