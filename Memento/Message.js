export default class Message {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }

  toString() {
    return `${this.question}\nA: ${this.answer}`;
  }
}