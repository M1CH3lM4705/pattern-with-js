import { marked } from 'marked'

export default class Marked{

    static init(){
      return new Marked();
    }

    converter(markdown){

      const html = marked.parse(markdown);

      return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    }
}