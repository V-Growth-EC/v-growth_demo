import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 購物車資料格式
// [
//   {
//     product_id: string | number,
//     quantity: number,
//     stylus: boolean,
//     keyboard: boolean
//   },
//   ...
// ]

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, options = { quantity: 1, stylus: false, keyboard: false }) => {
        set(state => {
          const idx = state.cart.findIndex(item => item.product_id === product.product_id);
          if (idx > -1) {
            // 已存在則更新數量與選項
            const updated = [...state.cart];
            updated[idx] = {
              ...updated[idx],
              quantity: updated[idx].quantity + options.quantity,
              stylus: options.stylus,
              keyboard: options.keyboard,
            };
            return { cart: updated };
          } else {
            // 新增
            return {
              cart: [
                ...state.cart,
                {
                  product_id: product.product_id,
                  quantity: options.quantity,
                  stylus: options.stylus,
                  keyboard: options.keyboard,
                },
              ],
            };
          }
        });
      },
      getCartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);

export default useCartStore; 