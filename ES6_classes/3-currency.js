export default class Currency {
    constructor(code, name) {
      // Utilisation des setters pour valider et assigner les valeurs
      this.code = code;
      this.name = name;
    }

    // Getter et setter pour "code"
    get code() {
      return this._code;
    }
    set code(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Code must be a string');
      }
      this._code = value;
    }

    // Getter et setter pour "name"
    get name() {
      return this._name;
    }
    set name(value) {
      if (typeof value !== 'string') {
        throw new TypeError('Name must be a string');
      }
      this._name = value;
    }

    // Méthode qui affiche "name (code)"
    displayFullCurrency() {
      return `${this._name} (${this._code})`;
    }
  }
