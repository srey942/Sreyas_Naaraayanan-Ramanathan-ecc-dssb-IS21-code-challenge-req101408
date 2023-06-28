import {
  getProduct,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "@/api/product";
import { useToasts } from "nextjs-components";
import { toast } from "react-toastify";
import { useQuery, useQueryClient, useMutation } from "react-query";

export const useGetAllProducts = (searchTerm) => {
  return useQuery(["products", { searchTerm }], () => getProducts(searchTerm));
};

export const useGetProductById = (id, options) => {
  return useQuery(["product", id], () => getProduct(id), options);
};

export const useDeleteProductById = (id) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries(["product", id]);
    },
  });
};

export const useAddProduct = () => {
  const toasts = useToasts();
  const queryClient = useQueryClient();
  return useMutation((product) => createProduct(product), {
    onSuccess: () => {
      toast.success("Product created successfully", {
        hideProgressBar: true,
        autoClose: 500,
        position: "bottom-left",
      });
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        toast.error(error.response.data.detail, {
          hideProgressBar: true,
          autoClose: 500,
          position: "bottom-left",
        });
      } else {
        toast.error(error.response.data.detail, {
          hideProgressBar: true,
          autoClose: 500,
          position: "bottom-left",
        });
        toasts.current.error(error.message);
      }
    },
  });
};

export const useUpdateProduct = (id) => {
  const toasts = useToasts();
  const queryClient = useQueryClient();
  return useMutation((product) => updateProduct(id, product), {
    onSuccess: () => {
      toast.success("Product updated successfully", {
        hideProgressBar: true,
        autoClose: 350,
        type: "success",
        position: "bottom-left",
      });
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries(["product", id]);
    },
    onError: (error) => {
      if (error.response?.status === 400 && error.response?.data?.detail) {
        toast.error(error.response.data.detail, {
          hideProgressBar: true,
          autoClose: 500,
          position: "bottom-left",
        });
      } else {
        toast.error(error.response.data.detail, {
          hideProgressBar: true,
          autoClose: 500,
          position: "bottom-left",
        });
      }
    },
  });
};
