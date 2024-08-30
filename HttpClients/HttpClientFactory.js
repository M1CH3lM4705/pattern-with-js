import FetchClient from './FetchClient.js'

export default class HttpClientFactory{
    static create(baseUrl){
        return new FetchClient(baseUrl);
    }
}