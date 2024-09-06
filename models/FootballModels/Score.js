import ScoreTime from "./ScoreTime.js";

export default class Score {
  constructor(winner, duration, fullTime, halfTime) {
    this.winner = winner;
    this.duration = duration;
    this.fulltime = fullTime;
    this.halfime = halfTime;
  }

  static fromJSON(json) {
    return new this(
      json.winner,
      json.duration,
      ScoreTime.fromJSON(json.fullTime),
      ScoreTime.fromJSON(json.halfTime)
    );
  }
}