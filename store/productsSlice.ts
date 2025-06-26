import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productos from "../zapato.json";

interface Producto {
  nombre: string;
  slug: string;
  precio: number;
  referencia: string;
  foto: string;
}

interface ProductsState {
  items: Producto[];
}

const initialState: ProductsState = {
  items: productos,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Producto[]>) {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer; 