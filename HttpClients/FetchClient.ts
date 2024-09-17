import AppError from '../ErrorHandler/AppError.js';
import HttpClient from './HttpClient.js';

export default class FetchClient extends HttpClient {
    constructor(baseUrl = '') {
        super(baseUrl)
    }

    async request(endpoint: string, method: string = 'GET', data: any = null, headers: Record<string, string> = {}): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;

        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }


        const response = await fetch(url, options);
        if (!response.ok) {
            throw new AppError(`HTTP error! status: ${response.status}`, 'UserFriendlyErrorStrategy');
        }
        return await response.json();

    }
}