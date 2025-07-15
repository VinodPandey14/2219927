export const generateShortcode = () => {
  return Math.random().toString(36).substr(2, 6);
};

export const storeURL = (data) => {
  let list = JSON.parse(localStorage.getItem("urlList")) || [];
  list.push(data);
  localStorage.setItem("urlList", JSON.stringify(list));
};

export const getStoredURLs = () => {
  return JSON.parse(localStorage.getItem("urlList")) || [];
};
