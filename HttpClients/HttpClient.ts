import IHttpClient from "../Interfaces/IHttpClient.js";

export default abstract class HttpClient implements IHttpClient {
    public baseUrl: string;

    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
    }

    abstract request(endpoint: string, method: string, data: any, headers: Record<string, string | undefined>): Promise<any>;

    get(endpoint: string, headers: Record<string, string | undefined> = {}): Promise<any> {
        return this.request(endpoint, 'GET', null, headers);
    }

    post(endpoint: any, data: any, headers: Record<string, string | undefined> = {}): Promise<any> {
        return this.request(endpoint, 'POST', data, headers);
    }

    put(endpoint: string, data: any, headers: Record<string, string | undefined> = {}): Promise<any> {
        return this.request(endpoint, 'PUT', data, headers);
    }

    delete(endpoint: string, headers: Record<string, string | undefined> = {}): Promise<any> {
        return this.request(endpoint, 'DELETE', null, headers);
    }
}