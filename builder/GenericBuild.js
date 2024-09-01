export default class GenericBuilder {
    constructor(ClassType) {
        this.instance = ClassType;
        this.dependencies = {};
    }

    static configure(ClassType){
        const generic = new GenericBuilder(ClassType);

        return generic;
    }

    #nameOf(Class){
        if(!Class instanceof Object){
            throw new Error("O Tipo não é uma classe");
        }
        return Class.constructor.name
    }

    withDependency(dependency) {
        const propertyName = this.#nameOf(dependency);
        this.dependencies[propertyName] = dependency;
        return this;
    }

    build() {
        
        const i = Object.entries(this.dependencies)
            .map(([propertyName, dependency]) => dependency)
      
        return new this.instance(...i);
    }
}