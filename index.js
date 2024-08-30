import GenericBuilder from "./builder/GenericBuild.js";
import ServiceLocator from "./Config/ServiceLocator.js";
import ErrorManagerFactory from "./factory/ErrorManagerFactory.js";
import HttpClientFactory from "./HttpClients/HttpClientFactory.js";
import Application from "./services/app.js";
import DatabaseService from "./services/database.js";
import LoggerService from "./services/logService.js";
import UserService from "./services/userService.js";
import Console from "./views/console.js";
import UserView from "./views/userView.js";

const databaseService = new DatabaseService('SqlServer 2022');
const loggerService = new LoggerService();
const serviceLocator = new ServiceLocator();
const userService = new UserService(loggerService, HttpClientFactory.create('http://localhost:3000'));
const userView = new UserView(new Console(), serviceLocator);
const errorManager = ErrorManagerFactory.createDefaultErrorManager();

serviceLocator.register(databaseService);
serviceLocator.register(loggerService);
serviceLocator.register(userService);
serviceLocator.register(errorManager);

const app = new GenericBuilder(Application)
                .withDependency(userView)
                .withDependency(loggerService)
                .withDependency(errorManager)
                .build();


app.run();