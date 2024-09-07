import CommandStrategy from "./CommandStrategy.js";

export default class AiStrategy extends CommandStrategy {
  constructor({ serviceLocator, argv }) {
    super(argv);
    this.serviceLocator = serviceLocator;
  }
  execute() {
    console.log('Ai');
  }
}