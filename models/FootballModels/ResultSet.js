export default class ResultSet {
  constructor(count, first, last, played) {
    this.count = count;
    this.first = first;
    this.last = last;
    this.played = played;
  }

  static fromJSON(json) {
    return new this(json.count, json.first, json.last, json.played);
  }
}