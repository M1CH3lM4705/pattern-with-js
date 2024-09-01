export default class ServiceLocator{
    constructor(){
        this.services = new Map();
    }

    register(instance){
        this.services.set(instance.constructor.name, instance);
    }

    get(serviceName){
        if(!this.services.has(serviceName)){
            throw new Error(`Serviço '${serviceName}' não encontrado`);
        }
        return this.services.get(serviceName);
    }
}