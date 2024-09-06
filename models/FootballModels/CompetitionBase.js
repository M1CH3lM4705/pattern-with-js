export default class CompetitionBase {
  constructor(id, name, code) {
    this.id = id;
    this.name = name;
    this.code = code;
  }

  static fromJSON(json) {
    return new this(json.id, json.name, json.code)
  }
}