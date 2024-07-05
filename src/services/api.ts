import axios from "axios";

// Configuração do Axios
export const api = axios.create({
  baseURL: "https://back-end-veggielink.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});


export const setToken = (token: string | undefined) => {
  if (token) {
    sessionStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    sessionStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
  }
};

const token = sessionStorage.getItem("authToken");
if (token) {
  setToken(token);
} else {
  setToken(undefined);
}
