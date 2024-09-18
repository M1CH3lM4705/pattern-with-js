import History from "./History";
import Memento from "./Memento";

export default class CareTaker {
  private history: Memento[];
  constructor() {
    this.history = [];
  }

  save(hs: History): void {
    this.history.push(hs.saveState())
  }

  undo(hs: History): void {
    if (this.history.length > 0) {
      hs.restoreState(this.history.pop());
    }
  }
}