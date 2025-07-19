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
      // 產品詳細資訊暫存
      productDetailsCache: {},
      setProductDetail: (product_id, detail) => {
        console.log('加入暫存:', product_id, detail);
        return set(state => ({
          productDetailsCache: {
            ...state.productDetailsCache,
            [product_id]: detail,
          },
        }));
      },
      getProductDetail: (product_id) => get().productDetailsCache[product_id],
      clearProductDetailsCache: () => set({ productDetailsCache: {} }),
      updateCartQuantity: (product_id, quantity) => set(state => ({
        cart: state.cart.map(item =>
          item.product_id === product_id
            ? { ...item, quantity: Math.max(1, Number(quantity)) }
            : item
        ),
      })),
      // 新增：刪除商品
      removeFromCart: (product_id) => set(state => ({
        cart: state.cart.filter(item => item.product_id !== product_id)
      })),
    }),
    {
      name: 'cart-storage', // localStorage key
      partialize: (state) => ({ cart: state.cart }), // 不持久化 productDetailsCache
    }
  )
);

export default useCartStore; 