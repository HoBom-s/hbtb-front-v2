// types
import type { Nullable } from "@/types";

/**
 * Session storage class
 *
 * @example
 *      SessionStorage.setItem(AUTH_KEY, "Hello");
 */
export class SessionStorage {
  /**
   * Session storage set item
   *
   * @param {string} k
   * @param {string} v
   */
  public static setItem(k: string, v: string) {
    sessionStorage.setItem(k, JSON.stringify(v));
  }

  /**
   * Session storage get item
   * If the item is exist, then return string.
   * Or not exist item, then return null
   *
   * @param {string} k
   * @returns {Nullable<string>}
   */
  public static getItem(k: string): Nullable<string> {
    const item: Nullable<string> = sessionStorage.getItem(k);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  /**
   * Session storage clear all items
   */
  public static clearAllItem() {
    sessionStorage.clear();
  }

  /**
   * Session storage remove item
   *
   * @param {string} k
   */
  public static deleteItem(k: string) {
    if (this.getItem(k)) {
      sessionStorage.removeItem(k);
    }
  }
}
