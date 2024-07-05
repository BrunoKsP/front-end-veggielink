import { api } from "../api";

const url = "category";

export const getAllCategorys = () => {
  return api.get(`${url}/all`);
};

export const createCategory = (data: ICreateCategory) => {
  console.log(data);
  return api.post(`${url}`, data);
};

export const getCategory = (id: string| undefined) => {
  return api.get(`${url}?id=${id}`);
};

interface ICreateCategory {
  name: string;
}
