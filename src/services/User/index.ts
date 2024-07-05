import { api } from "../api";
import { IAuthReponse, ILogin, ISigIn } from "./interface";

const url = "user";

export const login = (data: ILogin) => {
  return api.post<IAuthReponse>(`${url}/login`, data);
};

export const sigIn = (data: ISigIn) => {
  return api.post<IAuthReponse>(`${url}`, data);
};