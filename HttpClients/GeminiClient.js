import '../Config/dotenvConfig.js'
import { GoogleGenerativeAI } from '@google/generative-ai';

export default class GeminiClient {
  #api_key = process.env.API_KEY;
  #ia_model = process.env.MODEL;
  #genAi
  #model

  constructor() {
    this.#genAi = new GoogleGenerativeAI(this.#api_key);
    this.#model = this.#genAi.getGenerativeModel({ model: this.#ia_model }); //gemini-1.5-flash
    
  }

  static init() {
    return new GeminiClient();
  }

  async getPrompt(prompt) {

    const result = await this.#model.generateContent(prompt)

    const response = await result.response;

    return response.text();
  }
}