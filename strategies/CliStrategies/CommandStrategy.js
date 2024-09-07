
export default class CommandStrategy {
  constructor(argv) {
    this.argv = argv;
  }

  execute() {
    throw new Error('O método execute deve ser implementado.');
  }
}