import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.id === item.id && i.size === item.size
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeItem: (id, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.size === size)
          ),
        });
      },

      updateQuantity: (id, size, quantity) => {
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    {
      name: "mentastic-cart",
    }
  )
);