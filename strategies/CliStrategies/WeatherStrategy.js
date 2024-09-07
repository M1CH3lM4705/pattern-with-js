import CommandStrategy from "./CommandStrategy.js";

export default class WeatherStrategy extends CommandStrategy {
  constructor({ serviceLocator, argv }) {
    super(argv);
    this.serviceLocator = serviceLocator;
  }

  execute() {
    console.log('Clima');
  }
}