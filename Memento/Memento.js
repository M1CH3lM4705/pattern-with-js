export default class Memento {
  constructor(messages) {
    this.messages = messages;
  }

  getMessages() {
    return this.messages;
  }
}