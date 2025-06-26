import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  nombre: string;
  referencia: string;
  foto: string;
  talla: string;
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

const initialState: CartState = {
  items: [],
  open: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload);
      state.open = true;
    },
    removeFromCart(state, action: PayloadAction<{ nombre: string; talla: string }>) {
      state.items = state.items.filter(
        (item) => item.nombre !== action.payload.nombre || item.talla !== action.payload.talla
      );
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCart(state, action: PayloadAction<boolean | undefined>) {
      state.open = action.payload === undefined ? !state.open : action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer; 