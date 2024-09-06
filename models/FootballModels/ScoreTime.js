export default class ScoreTime {
  constructor(home, away) {
    this.home = home;
    this.away = away;
  }

  static fromJSON(json) {
    return new this(json.home, json.away);
  }
}