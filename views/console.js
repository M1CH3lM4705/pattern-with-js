import readline from 'node:readline';

export default class Console {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  prompt(query) {
    return new Promise((resolve) => {
      this.rl.question(query, (answer) => {
        resolve(answer);
      })
    })
  }

  writeLine(text) {
    if (!Array.isArray(text)) {
      this.rl.output.write(text.toString() + '\n');
      return;
    }

    text.forEach(t => this.rl.output.write(t.toString() + '\n'));
  }

  close() {
    this.rl.close();
  }

  get cls() {
    this.rl.output.write('\x1Bc')
  }
}