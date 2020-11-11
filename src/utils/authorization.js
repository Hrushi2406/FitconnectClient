function setToken(token) {
  localStorage.setItem("token", token);
}

function getToken(token) {
  return localStorage.getItem("token");
}

export { setToken, getToken };
