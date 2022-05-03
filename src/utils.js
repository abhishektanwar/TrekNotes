const utils = {
  setLocalStorage: (key, data) => localStorage.setItem(key, data),
  getLocalStorage: (key) => localStorage.getItem(key),
  removeLocalStorage: (key) => localStorage.removeItem(key),
  getImg:(category,name) => process.env.PUBLIC_URL + `/images/${category}/${name}`
}
export default utils;