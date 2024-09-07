import ArgvCommandsCliHelper from '../../Helpers/ArgvCommandsCli.js';
import AiStrategy from '../../strategies/CliStrategies/AiStrategy.js';
import CommandStrategy from '../../strategies/CliStrategies/CommandStrategy.js';
import FootballStrategy from '../../strategies/CliStrategies/FootballStrategy.js';
import WeatherStrategy from '../../strategies/CliStrategies/WeatherStrategy.js';

export default class Cli {
  constructor({ serviceLocator }) {
    this.serviceLocator = serviceLocator;
    this.ErrorManager = this.serviceLocator.get('ErrorManager');
  }

  static init(obj) {
    return new this(obj);
  }

  #commandStrategies = {
    ai: AiStrategy,
    f: FootballStrategy,
    w: WeatherStrategy
  }

  execute() {
    const argv = ArgvCommandsCliHelper.init();

    const commandName = argv._[0];

    const StrategyClass = this.#commandStrategies[commandName];

    try {
      if (StrategyClass instanceof CommandStrategy) {
        const strategy = new StrategyClass({ serviceLocator: this.serviceLocator, argv: argv });

        strategy.execute();
      }
    } catch (error) {

      this.ErrorManager.capture(error);

    }
  }

}