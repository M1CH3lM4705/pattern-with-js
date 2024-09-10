import pkg from 'whatsapp-web.js';
import '../Config/dotenvConfig.js';
import ErrorManagerFactory from "../factory/ErrorManagerFactory.js";
import HttpClientFactory from "../factory/HttpClientFactory.js";
import GeminiClient from "../HttpClients/GeminiClient.js";
import Marked from "../lib/Marked.js";
import CareTaker from '../Memento/CareTaker.js';
import History from '../Memento/History.js';
import FootballService from "../services/footballService.js";
import IaService from "../services/iaService.js";
import LoggerService from "../services/logService.js";
import UserService from "../services/userService.js";
import WeatherService from '../services/weatherService.js';
import TeamsSingleton from '../Singleton/TeamsSingleton.js';
import Console from "../views/console.js";
import FootballView from '../views/footballView.js';
import IaView from "../views/iaView.js";
import MainMenuView from "../views/mainMenuView.js";
import UserView from "../views/userView.js";
import WeatherView from '../views/WeatherView.js';
const { Client, LocalAuth } = pkg;

export default class InjectionConfig {
  constructor({ serviceLocator }) {
    this.serviceLocator = serviceLocator;

  }

  static init(obj) {
    const injection = new InjectionConfig(obj);

    injection.#initInstances();
  }

  #initInstances() {
    const loggerService = new LoggerService();
    const marked = Marked.init();
    const client = new Client({
      authStrategy: new LocalAuth()
    });

    this.serviceLocator.register(new TeamsSingleton())
    this.serviceLocator.register(marked);
    this.serviceLocator.register(new History())
    this.serviceLocator.register(new CareTaker())
    this.serviceLocator.register(GeminiClient.init());
    // this.serviceLocator.register(Chatbot.init({ serviceLocator: this.serviceLocator, client: client }))
    this.serviceLocator.register(new LoggerService());
    this.serviceLocator.register(new UserService(loggerService, HttpClientFactory.create('http://localhost:3000')));
    this.serviceLocator.register(WeatherService.init({
      serviceLocator: this.serviceLocator,
      httpClient: HttpClientFactory.create(process.env.BRASIL_API_BASE_ADDRESS)
    }))
    this.serviceLocator.register(FootballService.init({
      serviceLocator: this.serviceLocator,
      httpClient: HttpClientFactory.create(process.env.FOOTBAL_BASE_ADDRESS)
    }));
    this.serviceLocator.register(new Console());
    this.serviceLocator.register(ErrorManagerFactory.createDefaultErrorManager());
    this.serviceLocator.register(IaService.init({ serviceLocator: this.serviceLocator }));
    this.serviceLocator.register(IaView.init({ serviceLocator: this.serviceLocator }));
    this.serviceLocator.register(UserView.init({ serviceLocator: this.serviceLocator }));
    this.serviceLocator.register(FootballView.init({ serviceLocator: this.serviceLocator }))
    this.serviceLocator.register(MainMenuView.init({ serviceLocator: this.serviceLocator }));
    this.serviceLocator.register(WeatherView.init({ serviceLocator: this.serviceLocator }));

  }
}