import axios from "axios";

const API_KEY = "AIzaSyBsCn01XvzS1VcBpBua6vbim1aPbxssodQ";

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const res = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  const userData = { token: res.data.idToken, email: res.data.email };
  return userData;
};

export const createUser = async (email, password) => {
  await authenticate("signUp", email, password);
};

export const login = async (email, password) => {
  const userData = await authenticate("signInWithPassword", email, password);
  return userData;
};
