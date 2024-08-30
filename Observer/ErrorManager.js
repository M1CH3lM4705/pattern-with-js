export default class ErrorManager{
  #subscriber
  constructor(){
    this.#subscriber = []
  }

  subscribe(strategy){
    this.#subscriber.push(strategy);
  }

  unsubscribe(strategy){
    this.#subscriber = this.#subscriber.filter(sub => sub !== strategy);
  }

  notify(error){
    this.#subscriber.forEach(strategy => strategy.handle(error));
  }

  capture(error){
    this.notify(error);
  }
}