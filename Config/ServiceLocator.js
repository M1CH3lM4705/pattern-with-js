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

    // execute(serviceName, args = []) {
    //     const service = this.get(serviceName);
        
    //     if (service.methodName && typeof service.instance[service.methodName] === 'function') {
    //         return service.instance[service.methodName](...args);
    //     } else {
    //         return service.instance;
    //     }
    // }
}