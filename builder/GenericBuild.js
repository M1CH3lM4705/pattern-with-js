export default class GenericBuilder {
    constructor(ClassType) {
        this.instance = new ClassType();
        this.dependencies = {};
    }

    #nameOf(Class){
        if(!Class instanceof Object){
            throw new Error("O Tipo não é uma classe");
        }
        return Class.constructor.name
    }
    // Método para definir dependências
    withDependency(dependency) {
        const propertyName = this.#nameOf(dependency);
        this.dependencies[propertyName] = dependency;
        return this;
    }

    // Método para construir a instância final
    build() {
        // Injeta as dependências na instância
        for (const [propertyName, dependency] of Object.entries(this.dependencies)) {
            this.instance[propertyName] = dependency;
        }
        return this.instance;
    }
}