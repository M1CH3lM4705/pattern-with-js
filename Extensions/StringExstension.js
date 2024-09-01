export default class StringExtension{
    static nameOf(Class){
        if(!Class instanceof Object){
            throw new Error("O Tipo não é uma classe");
        }
        return Class.constructor.name
    }
    
}