const baseUrl = "http://localhost:3001";

const getHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token && { authorization: `Bearer ${token}` }),
  };
};

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const getItems = () => {
  return request(`${baseUrl}/items`);
};

export const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const removeItem = (itemID) => {
  return request(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};

export const updateUserProfile = ({ name, avatar }) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  });
};

export const addCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  });
};

export const removeCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  });
};
