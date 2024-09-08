export default class CareTaker {
  constructor() {
    this.history = [];
  }

  save(hs) {
    this.history.push(hs.saveState())
  }

  undo(hs) {
    if (this.history.length > 0) {
      hs.restoreState(this.history.pop());
    }
  }
}