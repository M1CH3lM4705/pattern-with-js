export default interface IIaService {
  getQuestion(prompt: string): Promise<string>
}