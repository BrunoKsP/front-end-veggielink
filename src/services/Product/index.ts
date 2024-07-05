import { api } from "../api";

const url = "products";

export const getProduct = () => {
  return api.get(`${url}/all`);
};

export const getProductById = (id: string) => {
  return api.get(`${url}`, {
    params: {
      id: id,
    },
  });
};

export const createProduct = (data: ICreateProduct) => {
  return api.post(`${url}`, data);
};

export const updateProduct = (id: string, data: IChangeProduct) => {
  return api.put(`${url}?id=${id}`, data);
};

interface ICreateProduct {
  name: string;
  description?: string;
  thumb?: string;
  categoryId?: string;
  plantingDate: Date;
  preparingDate: Date;
  observation: string;
  fertilizer: string;
}
interface IChangeProduct {
  name: string;
  status: number;
  description?: string;
  category?: string;
  thumb?: string;
  categoryId?: string;
  plantingDate: Date;
  harverstDate: Date;
  preparingDate: Date;
  observation: string;
  fertilizer: string;
}
