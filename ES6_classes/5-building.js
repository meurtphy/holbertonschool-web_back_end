export default class Building {
  constructor(sqft) {
    if (typeof sqft !== 'number') {
      throw new TypeError('sqft must be a number');
    }

    this._sqft = sqft;

    // Vérifie si la méthode est bien redéfinie dans une sous-classe
    if (this.constructor !== Building && typeof this.evacuationWarningMessage !== 'function') {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
  }

  // Getter
  get sqft() {
    return this._sqft;
  }

  // Méthode abstraite (doit être redéfinie dans les sous-classes)
  evacuationWarningMessage() {
    throw new Error(`Class ${this.constructor.name} must override evacuationWarningMessage`);
  }
}
