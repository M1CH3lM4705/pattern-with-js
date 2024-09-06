import Marked from "../lib/Marked.js";

export default class StringExtension {
    static nameOf(Class) {
        if (!Class instanceof Object) {
            throw new Error("O Tipo não é uma classe");
        }
        return Class.constructor.name
    }

    static parsedMarkdown(text) {
        const marked = Marked.init();
        const pureText = marked.converter(text);

        return pureText.split('\n');
    }
}