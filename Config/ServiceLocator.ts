import IServiceLocator from "../Interfaces/IServiceLocator";

export default class ServiceLocator implements IServiceLocator {
    private services: Map<string, any>;
    constructor() {
        this.services = new Map();
    }

    register(instance: any): void {
        this.services.set(instance.constructor.name, instance);
    }

    get(serviceName: string): any {
        if (!this.services.has(serviceName)) {
            throw new Error(`Serviço '${serviceName}' não encontrado`);
        }
        return this.services.get(serviceName);
    }
}