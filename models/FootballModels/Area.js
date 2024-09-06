import CompetitionBase from "./CompetitionBase.js";

export default class Area extends CompetitionBase {
  constructor(id, name, code, flag) {
    super(id, name, code);
    this.flag = flag;
  }

  static fromJSON(json) {
    const entityBase = super.fromJSON(json);
    return new this(entityBase.id, entityBase.name, entityBase.code, json.flag);
  }
}