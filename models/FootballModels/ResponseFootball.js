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

  get currentMatchDay() {
    const match = this.matches[0]

    return match.season.currentMatchday
  }

  matchesShow() {
    const result = this.matches.reduce((acc, match) => {
      const obj = {
        timeDaCasa: match.homeTeam.shortName,
        placar: `(${match.score.fulltime.home ?? 0}) x (${match.score.fulltime.away ?? 0})`,
        visitante: match.awayTeam.shortName,
        vencedor: match.score.winner
      }
      acc.push(obj)
      return acc;
    }, []);
    return result;
  }

  selectListTeams(league, singletonTeam) {
    this.matches.forEach(match => {
      singletonTeam.add(league, match.homeTeam.selectOptionTeam());
      singletonTeam.add(league, match.awayTeam.selectOptionTeam());
    })
  }
}