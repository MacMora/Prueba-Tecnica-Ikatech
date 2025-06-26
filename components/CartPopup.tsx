"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleCart, removeFromCart, clearCart } from "../store/cartSlice";
import Image from "next/image";

export default function CartPopup() {
  const { items, open } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#D9D9D9B2] flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl sm:text-2xl"
          onClick={() => dispatch(toggleCart(false))}
        >
          ×
        </button>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Carrito de compras</h2>
        {items.length === 0 ? (
          <div className="text-center text-gray-500 text-sm sm:text-base">El carrito está vacío.</div>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200 mb-3 sm:mb-4 max-h-48 sm:max-h-60 overflow-y-auto">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 sm:gap-3 py-2">
                  <Image src={`/images/${item.foto}`} alt={item.nombre} width={40} height={24} className="rounded w-10 h-6 sm:w-[50px] sm:h-[30px]" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm truncate">{item.nombre}</div>
                    <div className="text-xs text-gray-500">Talla: {item.talla}</div>
                  </div>
                  <button
                    className="text-red-500 text-xs hover:underline flex-shrink-0"
                    onClick={() => dispatch(removeFromCart({ nombre: item.nombre, talla: item.talla }))}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-[#7c5a63] text-white py-2 rounded font-bold text-sm sm:text-base hover:bg-[#5a3e47] transition mb-2"
              onClick={() => dispatch(clearCart())}
            >
              Vaciar carrito
            </button>
            <button className="w-full bg-gray-200 text-[#7c5a63] py-2 rounded font-bold text-sm sm:text-base mt-2">Finalizar compra</button>
          </div>
        )}
      </div>
    </div>
  );
} 