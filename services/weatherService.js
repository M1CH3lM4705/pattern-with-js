
import Waether from '../models/Weathers/Weather.js';

export default class WeatherService {
  constructor({ serviceLocator, httpClient }) {
    this.serviceLocator = serviceLocator;
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.httpClient = httpClient;
  }

  static init(obj) {
    return new this(obj);
  }

  async getWeather() {
    this.loggerService.log('Aguarde... Buscando dados de clima');

    const response = await this.httpClient.get('/cptec/v1/clima/previsao/238');

    const weather = Waether.fromJSON(response);

    this.loggerService.dir(weather);
  }
}