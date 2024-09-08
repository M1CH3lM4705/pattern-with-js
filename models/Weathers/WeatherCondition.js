import DateHelper from "../../Helpers/dateHelper.js";

export default class WeatherCondition {
  constructor(date, condition, min, max, uv, description) {
    this.date = date;
    this.condition = condition;
    this.min = min;
    this.max = max;
    this.uv = uv;
    this.description = description;
  }

  static fromJSON(json) {
    return new this(
      json.data,
      json.condicao,
      json.min,
      json.max,
      json.indice_uv,
      json.condicao_desc
    )
  }

  toString() {
    const outPut = `
      Previsão para: ${DateHelper.date(this.date)}
      Condição: ${this.description}
      Temperatura: Mínima ${this.min}°C, Máxima ${this.max}°C
      Índice UV: ${this.uv}
    `

    return outPut;
  }
}