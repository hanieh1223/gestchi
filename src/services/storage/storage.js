const STORAGE_PREFIX = "ghestyar";
const CURRENT_VERSION = 1;

function storageKey(key) {
  return `${STORAGE_PREFIX}:v${CURRENT_VERSION}:${key}`;
}

export const storage = {
  get(key, fallback = null) {
    try {
      const value = window.localStorage.getItem(storageKey(key));
      return value === null ? fallback : JSON.parse(value);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(storageKey(key), JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(storageKey(key));
    } catch {
      // Storage may be unavailable in private browsing or restricted contexts.
    }
  },
};
