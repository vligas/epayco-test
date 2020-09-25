export const storage = {
  set: (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },
};
