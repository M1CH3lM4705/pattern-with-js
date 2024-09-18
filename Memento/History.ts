import Memento from "./Memento.js";
import Message from "./Message.js";
export default class History {

  public messages: Message[];

  constructor() {
    this.messages = [];
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getFullConversation(): string {
    return this.messages.map(msg => msg.toString()).join('\n')
  }

  saveState(): Memento {
    return new Memento([...this.messages])
  }

  restoreState(memento?: Memento): void {
    this.messages = [...memento?.getMessages() ?? []];
  }
}