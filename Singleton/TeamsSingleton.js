export default class TeamsSingleton {
  constructor() {
    if (!TeamsSingleton.instance) {
      this.teams = new Map();
      TeamsSingleton.instance = this;
    }

    return TeamsSingleton.instance;
  }

  add(league, team) {
    if (!this.teams.has(league)) {
      this.teams.set(league, new Set());
    }
    this.teams.get(league).add(team);
  }

  getTeams(league) {
    return Array.from(this.teams.get(league) || []);
  }
}