import { v4 } from "uuid";

export default class Guid{
    static newGuid(){
        return v4();
    }

    static isValid(id){
        return id.length === Guid.newGuid().length ||
            id !== null || id !== 'undefined' || id !== '';
    }
}