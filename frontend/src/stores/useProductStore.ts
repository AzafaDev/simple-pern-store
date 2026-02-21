import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import type { Product } from "../utils";
import toast from "react-hot-toast";

interface ProductsStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  formData: Product;
  currentProduct: Product | null;
  setCurrentProduct: (product: Product) => void;
  setFormData: (product: Product) => void;
  resetFormData: () => void;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  createProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  fetchProduct: (id: number) => Promise<void>;
  updateProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useProductStore = create<ProductsStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  formData: {
    id: 0,
    name: "",
    image: "",
    price: 0,
    created_at: new Date(),
  },
  currentProduct: null,
  setFormData: (product: Product) => {
    set({ formData: product });
  },
  setCurrentProduct: (product: Product) => {
    set({ currentProduct: product });
  },
  resetFormData: () => {
    set({
      formData: {
        id: 0,
        name: "",
        image: "",
        price: 0,
        created_at: new Date(),
      },
    });
  },
  fetchProducts: async () => {
    set({ loading: true, error: null, products: [] });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data, error: null });
    } catch (error) {
      console.log("error fetching products", error);
      set({ error: "error fetching products", products: [] });
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id: number) => {
    const { fetchProducts } = useProductStore.getState();
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log("error deleting product", error);
      toast.error("Error deleting product");
      set({ error: "error deleting product" });
    } finally {
      set({ loading: false });
    }
  },
  createProduct: async (e) => {
    e.preventDefault();
    const { fetchProducts } = useProductStore.getState();
    const product = useProductStore.getState().formData;
    set({ loading: true, error: null });
    try {
      await axiosInstance.post("/products", product);
      fetchProducts();
      get().resetFormData();
      toast.success("Product created successfully");
      (document.getElementById("add_product_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.log("error creating product", error);
      toast.error("Error creating product");
      set({ error: "error creating product" });
    } finally {
      set({ loading: false });
    }
  },
  fetchProduct: async (id: number) => {
    set({ loading: true, error: null, currentProduct: null });
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      set({ currentProduct: response.data, error: null });
    } catch (error) {
      console.log("error fetching product", error);
      set({ error: "error fetching product", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (e) => {
    e.preventDefault();
    const { fetchProducts } = useProductStore.getState();
    const product = useProductStore.getState().formData;
    set({ loading: true, error: null });
    try {
      await axiosInstance.put(`/products/${product.id}`, product);
      toast.success("Product updated successfully");
      fetchProducts();
      get().resetFormData();
    } catch (error) {
      console.log("error updating product", error);
      toast.error("Error updating product");
      set({ error: "error updating product" });
    } finally {
      set({ loading: false });
    }
  },
}));
