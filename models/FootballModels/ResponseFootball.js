import Competition from "./Competition.js";
import Match from "./Match.js";
import ResultSet from './ResultSet.js';
import Standing from "./Standing.js";

export default class ResponseFootball {
  constructor(resultSet, competition, matches = null, standings = null) {
    this.resultSet = resultSet;
    this.competition = competition;
    this.matches = matches;
    this.standings = standings;
  }

  static fromJSON(json) {
    return new this(
      ResultSet.fromJSON(json?.resultSet),
      Competition.fromJSON(json?.competition),
      json.matches?.map(match => Match.fromJSON(match)),
      json.standings?.map(standing => Standing.fromJSON(standing))
    );
  }
}