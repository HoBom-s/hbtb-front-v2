/**
 * Validation class
 *
 * @example
 *      const isValidPassword: boolean =  Validation.isPassword("password");
 */
export class Validation {
  /**
   * 8자 영문자 특수문자
   *
   * @param {string} v
   * @returns {boolean}
   */
  public static isPassword(v: string): boolean {
    const regx =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    const trimedString: string = v.trim();

    if (trimedString.length < 8) {
      return false;
    }

    if (!regx.test(trimedString)) {
      return false;
    }

    return true;
  }
}
