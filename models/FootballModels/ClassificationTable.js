import Team from "./Team.js";

export default class ClassificationTable {
  constructor(position, team, playedGames, form, won, draw, lost, points, goalsFor, goalsAgainst, goalDifference) {
    this.position = position;
    this.team = team; // Isso será uma instância da classe `Team`
    this.playedGames = playedGames;
    this.form = form;
    this.won = won;
    this.draw = draw;
    this.lost = lost;
    this.points = points;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
    this.goalDifference = goalDifference;
  }

  static fromJSON(json) {
    return new this(
      json.position,
      Team.fromJSON(json.team),
      json.playedGames,
      json.form,
      json.won,
      json.draw,
      json.lost,
      json.points,
      json.goalsFor,
      json.goalsAgainst,
      json.goalDifference
    );
  }
}