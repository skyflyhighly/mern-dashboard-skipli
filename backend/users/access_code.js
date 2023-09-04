class AccessCode {
  static #MAX_VALUE = 9999999;
  static #MIN_VALUE = 1000000;
  static #ACCESS_CODE_LENGTH = 6;

  #value;

  constructor(value) {
    if (value === undefined || value === null) {
      this.#value = this.#generateAccessCode();
    } else {
      this.#validate(value);
      this.#value = value;
    }
  }

  toString() {
    return this.#value;
  }

  /**
   * @param {AccessCode | string} other
   */
  compare(other) {
    if (other === undefined || other === null) {
      return false;
    }
    if (typeof other === "string") {
      return this.value === other;
    }
    if (!(other instanceof AccessCode)) {
      return false;
    }
    return this.value === other.value;
  }

  /**
   * Generate a 6-digit access code
   *
   * @return access code
   */
  #generateAccessCode() {
    return Math.floor(
      (Math.random() * AccessCode.#MAX_VALUE) % AccessCode.#MIN_VALUE
    );
  }

  /**
   * @param {string} value
   */
  #validate(value) {
    if (typeof value !== "string") {
      throw new Error("Access Code must be a string");
    }
    if (value.length !== AccessCode.#ACCESS_CODE_LENGTH) {
      throw new Error(`Access Code must have ${ACCESS_CODE_LENGTH} digits`);
    }
  }

  /**
   * @param {string} value
   */
  static fromString(value) {
    if (typeof value !== "string") {
      throw new Error("Passed value must be a string");
    }
    return new AccessCode(value);
  }
}

module.exports = AccessCode;
