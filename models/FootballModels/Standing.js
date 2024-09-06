import ClassificationTable from './ClassificationTable.js';

export default class Standing {
  constructor(stage, type, group, table) {
    this.stage = stage;
    this.type = type;
    this.group = group;
    this.table = table;
  }

  static fromJSON(json) {
    return new this(
      json.stage,
      json.type,
      json.group,
      json.table.map(entry => ClassificationTable.fromJSON(entry))
    )
  }
}