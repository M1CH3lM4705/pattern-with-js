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
}