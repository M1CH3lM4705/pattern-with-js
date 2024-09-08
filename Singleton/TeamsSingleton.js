export default class TeamsSingleton {
  constructor() {
    if (!TeamsSingleton.instance) {
      this.teams = new Set();
      TeamsSingleton.instance = this;
    }

    return TeamsSingleton.instance;
  }

  add(team) {
    this.teams.add(team);
  }

  getTeams() {
    return Array.from(this.teams);
  }
}