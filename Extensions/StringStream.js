import { Readable } from 'stream';
export default class StringStream extends Readable {
  constructor(array) {
    super({ objectMode: true });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index < this.array.length) {
      this.push(this.array[this.index]);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}