import ResponseFootball from "../models/FootballModels/ResponseFootball";

export default interface IFootballService {
  getLeague(league: string): Promise<string>
  getTeams(league: string): Promise<void>;
  getMatchs(league: string, currentMatchDay: number): Promise<ResponseFootball>
  getStandings(league: string): Promise<string>
  getMatchsTeam(id: number): Promise<string>
}