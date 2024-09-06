
export default class Season {
  constructor(id, startDate, endDate, currentMatchday, winner) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.currentMatchday = currentMatchday;
    this.winner = winner;
  }

  static fromJSON(json) {
    return new this(
      json.id,
      json.startDate,
      json.endDate,
      json.currentMatchday,
      json.winner
    );
  }
}