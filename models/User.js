import AppError from "../ErrorHandler/AppError.js";
import Guid from "./Guid.js";

export default class User {
  constructor(id, name, age) {
    this.id = id || Guid.newGuid();
    this.name = name;
    this.age = Number(age)
    if (!this.#validate()) {
      throw new AppError('Os dados preenchidos não são valídos.', 'Validation');
    }
  }

  toString() {
    return `
      id: ${this.id},
      Name: ${this.name},
      Age: ${this.age}
    `;
  }

  #validate() {
    return this.id.length &&
      this.name.length &&
      (this.age != 0 && this.age >= 18)
  }
}