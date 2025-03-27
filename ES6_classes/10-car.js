export default class Car {
  constructor(brand, motor, color) {
    this._brand = brand;
    this._motor = motor;
    this._color = color;
  }

  // Symbol.species permet de définir le constructeur utilisé pour .cloneCar()
  static get [Symbol.species]() {
    return this;
  }

  cloneCar() {
    const Constructor = this.constructor[Symbol.species];
    return new Constructor();
  }
}
