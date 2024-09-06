import Area from './Area.js';
import Competition from "./Competition.js";
import Score from "./Score.js";
import Season from "./Season.js";
import Team from "./Team.js";

export default class Match {
  constructor(id, utcDate, status, matchday, stage, lastUpdated, homeTeam, awayTeam, score, referees, area, competition, season) {
    this.id = id;
    this.utcDate = utcDate;
    this.status = status;
    this.matchday = matchday;
    this.stage = stage;
    this.lastUpdated = lastUpdated;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.score = score;
    this.referees = referees;
    this.area = area;
    this.competition = competition;
    this.season = season;
  }

  static fromJSON(json) {
    return new this(
      json.id,
      json.utcDate,
      json.status,
      json.matchday,
      json.stage,
      json.lastUpdated,
      Team.fromJSON(json.homeTeam),
      Team.fromJSON(json.awayTeam),
      Score.fromJSON(json.score),
      json.referees,
      Area.fromJSON(json.area),
      Competition.fromJSON(json.competition),
      Season.fromJSON(json.season)
    );
  }
}