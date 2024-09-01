import LoggerService from "../services/logService.js";
import UserService from "../services/userService.js";
import Console from "../views/console.js";
import UserView from "../views/userView.js";
import ErrorManagerFactory from "../factory/ErrorManagerFactory.js";
import HttpClientFactory from "../HttpClients/HttpClientFactory.js";
import Marked from "../lib/Marked.js";
import GeminiClient from "../HttpClients/GeminiClient.js";
import IaService from "../services/iaService.js";
import MainMenuView from "../views/mainMenuView.js";
import IaView from "../views/iaView.js";
import BaseMenuView from "../views/BaseMenuView.js";

export default class InjectionConfig {
  constructor({serviceLocator}) {
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
    this.serviceLocator.register(new LoggerService());
    this.serviceLocator.register(new UserService(loggerService, HttpClientFactory.create('http://localhost:3000')));
    this.serviceLocator.register(new Console());
    this.serviceLocator.register(ErrorManagerFactory.createDefaultErrorManager());
    this.serviceLocator.register(GeminiClient.init());
    this.serviceLocator.register(IaService.init({serviceLocator:this.serviceLocator}));
    this.serviceLocator.register(IaView.init({serviceLocator:this.serviceLocator}));
    this.serviceLocator.register(UserView.init({serviceLocator:this.serviceLocator}));
    this.serviceLocator.register(MainMenuView.init({serviceLocator:this.serviceLocator}));
  }
}