import Memento from "./Memento.js";
export default class History {


  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  getFullConversation() {
    return this.messages.map(msg => msg.toString()).join('\n')
  }

  saveState() {
    return new Memento([...this.messages])
  }

  restoreState(memento) {
    this.messages = [...memento.getMessage()];
  }
}