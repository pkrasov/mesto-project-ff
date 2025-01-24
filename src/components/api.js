const config = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "1a960d85-ec02-40e5-9cb4-8e35989ba6cb",
    "Content-Type": "application/json",
  },
};

function httpGet(query) {
  return fetch(config.baseUrl + "/" + query, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} , ${res.message}`);
  });
}

function httpPostAs(query, post_method, post_body) {
  let req = {
    method: post_method,
    headers: config.headers,
  };
  if (post_body) req.body = JSON.stringify(post_body);
  return fetch(config.baseUrl + "/" + query, req).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} , ${res.message}`);
  });
}

export function getProfile() {
  return httpGet("users/me");
}

export function getInitialCards() {
  return httpGet("cards");
}

export function updateProfile(body) {
  return httpPostAs("users/me", "PATCH", body);
}

export function addCard(body) {
  return httpPostAs("cards", "POST", body);
}

export function deleteCard(id) {
  return httpPostAs("cards/" + id, "DELETE", null);
}

function setLike(id) {
  return httpPostAs("cards/likes/" + id, "PUT", null);
}

function removeLike(id) {
  return httpPostAs("cards/likes/" + id, "DELETE", null);
}

export function toggleLike(id, liked) {
  if (liked) return removeLike(id);
  else return setLike(id);
}

export function updateAvatar(body) {
  return httpPostAs("users/me/avatar", "PATCH", body);
}
