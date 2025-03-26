export default class HolbertonClass {
  constructor(size, location) {
    this._size = size;
    this._location = location;
  }

  get size() {
    return this._size;
  }

  get location() {
    return this._location;
  }

  // Pour la conversion en nombre
  valueOf() {
    return this._size;
  }

  // Pour la conversion en string
  toString() {
    return this._location;
  }
}
