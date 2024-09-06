import CompetitionBase from './CompetitionBase.js';

export default class Competition extends CompetitionBase {
  constructor(id, name, code, type, emblem) {
    super(id, name, code);
    this.type = type;
    this.emblem = emblem;
  }

  static fromJSON(json) {
    const entityBase = super.fromJSON(json);
    return new this(entityBase.id, entityBase.name, entityBase.code, json.type, json.emblem);
  }
}