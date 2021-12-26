import axios from "axios";
const jwt = require("jsonwebtoken");

const usersApi = axios.create({
  baseURL: "https://foronext.netlify.app/api/users",
});
const jwtApi = axios.create({
  baseURL: "https://foronext.netlify.app/api/jwt/renovate",
});

export const JWT_SEED = "123";

export const verifyUser = async (email, password) => {
  const resp = await usersApi.post("/verify", { email, password });
  const data = resp.data;
  return data;
};
export const validateAndCreateUser = async (user) => {
  const { data } = await usersApi.post("/", user);
  return data;
};
export const getFullUserById = async (id) => {
  const { data } = await usersApi.get(`/${id}`);
  return data;
};
export const generarJWT = (id, name) => {
  const payload = { id, name };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log("error generando token");
          // TODO MAL
          reject(err);
        } else {
          // TODO BIEN
          resolve(token);
        }
      }
    );
  });
};
export const refreshToken = async (token) => {
  const headers = { "x-token": token };
  const { data } = await jwtApi.get("/", { headers });
  return data;
};
