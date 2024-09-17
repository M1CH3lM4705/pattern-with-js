
import IHttpClient from '../Interfaces/IHttpClient.js';
import ILoggerService from '../Interfaces/ILoggerService.js';
import IServiceLocator from '../Interfaces/IServiceLocator.js';
import IWeatherService from '../Interfaces/IWeatherService.js';
import Waether from '../models/Weathers/Weather.js';

type WeatherServiceProps = {
  serviceLocator: IServiceLocator;
  httpClient: IHttpClient
}

export default class WeatherService implements IWeatherService {

  private readonly serviceLocator: IServiceLocator;
  private readonly httpClient: IHttpClient;
  private readonly loggerService: ILoggerService;

  constructor({ serviceLocator, httpClient }: WeatherServiceProps) {
    this.serviceLocator = serviceLocator;
    this.loggerService = this.serviceLocator.get('LoggerService');
    this.httpClient = httpClient;
  }

  static init(obj: WeatherServiceProps) {
    return new this(obj);
  }

  async getWeather(): Promise<string> {
    this.loggerService.log('Aguarde... Buscando dados de clima');

    const response = await this.httpClient.get('/cptec/v1/clima/previsao/238');

    const weather = Waether.fromJSON(response);

    return weather.toString();
  }
}