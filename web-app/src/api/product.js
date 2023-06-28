import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const getProduct = async(id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
};

export const getProducts = async(searchTerm) => {
    const response = await api.get("/product", { params: { searchTerm } });
    return response.data;
};

export const createProduct = async(product) => {
    const response = await api.post("/product", product);
    return response.data;
};

export const updateProduct = async(id, product) => {
    const response = await api.put(`/product/${id}`, product);
    return response.data;
};

export const deleteProduct = async(id) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
};