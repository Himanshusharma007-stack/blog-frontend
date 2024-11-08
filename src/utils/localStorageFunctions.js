function saveInLocalstorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  function getDatafromLocalstorage(key) {
    let data = localStorage.getItem(key) || null;
    return JSON.parse(data);
  }
  
  function removeDatafromLocalstorage(key) {
    localStorage.removeItem(key);
  }
  
  export default { saveInLocalstorage, getDatafromLocalstorage, removeDatafromLocalstorage };
  