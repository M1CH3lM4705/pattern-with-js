import AppError from "../ErrorHandler/AppError.js";

export default class HttpClient{
    constructor(baseUrl = ''){
        this.baseUrl = baseUrl;
    }

    async request(endpoint, method = 'GET', data = null, headers = {}){
        throw new AppError('Metodo "request" deve ser implementado')
    }

    get(endpoint, headers = {}){
        return this.request(endpoint, 'GET', null, headers);
    }

    post(endpoint, data, headers = {}){
        return this.request(endpoint, 'POST', data, headers);
    }

    put(endpoint, data, headers = {}){
        return this.request(endpoint, 'PUT', data, headers);
    }

    delete(endpoint, headers = {}){
        return this.request(endpoint, 'DELETE', null, headers);
    }
}