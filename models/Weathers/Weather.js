import DateHelper from "../../Helpers/dateHelper.js";
import WeatherCondition from "./WeatherCondition.js";

export default class Waether {
  constructor(city, state, updateAt, weatherCondition) {
    this.city = city;
    this.state = state;
    this.updateAt = updateAt;
    this.weatherCondition = weatherCondition
  }

  static fromJSON(json) {
    return new this(
      json.cidade,
      json.estado,
      json.atualizado_em,
      json.clima.map(wc => WeatherCondition.fromJSON(wc))
    )
  }

  toString() {
    const outPut = `
      Cidade: ${this.city}, ${this.state}
      Ultima atualização: ${DateHelper.date(this.updateAt)}
      ${this.weatherCondition.map(w => w.toString())}
    `

    return outPut;
  }
}