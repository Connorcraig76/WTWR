const baseUrl = "http://localhost:3001";

const getHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token && { authorization: `Bearer ${token}` }),
  };
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(checkResponse);
};

export const updateUserProfile = ({ name, avatar }) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(checkResponse);
};

export const addCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  }).then(checkResponse);
};

export const removeCardLike = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(checkResponse);
};
