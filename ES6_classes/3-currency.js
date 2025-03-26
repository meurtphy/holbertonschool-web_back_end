export default class Currency {
  constructor(code, name) {
    if (typeof code !== 'string') {
      throw new TypeError('Code must be a string');
    }
    if (typeof name !== 'string') {
      throw new TypeError('Name must be a string');
    }

    this._code = code;
    this._name = name;
  }

  // --- Getters ---
  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  // --- Setters ---
  set code(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Code must be a string');
    }
    this._code = value;
  }

  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = value;
  }

  // --- Method ---
  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}
