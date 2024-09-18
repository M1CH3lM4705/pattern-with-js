import Message from "./Message";

export default class Memento {
  private messages: Message[]
  constructor(messages: Message[]) {
    this.messages = messages;
  }

  getMessages(): Message[] {
    return this.messages;
  }
}