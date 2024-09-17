export default interface IWeatherService {
  getWeather(): Promise<string>;
}