import CompetitionBase from "./CompetitionBase.js";

export default class Team extends CompetitionBase {
  constructor(id, name, code, shortName, tla, crest) {
    super(id, name, code);
    this.shortName = shortName,
      this.tla = tla;
    this.crest = crest;
  }

  static fromJSON(json) {
    const entityBase = super.fromJSON(json);
    return new this(entityBase.id, entityBase.name, entityBase.code, json.shortName, json.tla, json.crest);
  }
}