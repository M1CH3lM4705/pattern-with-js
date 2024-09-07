import CommandStrategy from "./CommandStrategy.js";

export default class FootballStrategy extends CommandStrategy {
  constructor({ serviceLocator, argv }) {
    super(argv);
    this.serviceLocator = serviceLocator;
  }

  execute() {
    console.log('Futebol');
  }
}