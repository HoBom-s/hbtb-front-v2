/**
 * Generate unique id
 *
 * @returns {string}
 */
export const generateUid = (): string => {
  const uid: string = `HoBom-${Date.now().toString(36)}:${Date.now().toString(
    36,
  )}:${Date.now().toString(36)}:${Math.random()
    .toString(36)
    .substring(2)}:${Date.now().toString(36)}:${Math.random()
    .toString(36)
    .substring(2)}`;

  return uid;
};
