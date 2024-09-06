import '../Config/dotenvConfig.js';
import ErrorManagerFactory from "../factory/ErrorManagerFactory.js";
import HttpClientFactory from "../factory/HttpClientFactory.js";
import GeminiClient from "../HttpClients/GeminiClient.js";
import Marked from "../lib/Marked.js";
import FootballService from "../services/footballService.js";
import IaService from "../services/iaService.js";
import LoggerService from "../services/logService.js";
import UserService from "../services/userService.js";
import Console from "../views/console.js";
import FootballView from '../views/footballView.js';
import IaView from "../views/iaView.js";
import MainMenuView from "../views/mainMenuView.js";
import UserView from "../views/userView.js";

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

    this.serviceLocator.register(marked);
    this.serviceLocator.register(GeminiClient.init());
    this.serviceLocator.register(new LoggerService());
    this.serviceLocator.register(new UserService(loggerService, HttpClientFactory.create('http://localhost:3000')));
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

  }
}