import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// カートデータの形式
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
      productDetailsCache: {},

      addToCart: (productId, quantity = 1, stylus = true, keyboard = true) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product_id === productId);

        if (existingItem) {
          // 既存の場合は数量とオプションを更新
          set({
            cart: cart.map(item =>
              item.product_id === productId
                ? { ...item, quantity: item.quantity + quantity, stylus, keyboard }
                : item
            )
          });
        } else {
          // 新規追加
          set({
            cart: [...cart, { product_id: productId, quantity, stylus, keyboard }]
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map(item =>
            item.product_id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        });
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.product_id !== productId)
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getCartCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // 商品詳細情報のキャッシュ
      setProductDetail: (productId, detail) => {
        const { productDetailsCache } = get();
        set({
          productDetailsCache: {
            ...productDetailsCache,
            [productId]: detail
          }
        });
      },

      getProductDetail: (productId) => {
        const { productDetailsCache } = get();
        return productDetailsCache[productId];
      },

      // 商品削除
      removeItem: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.product_id !== productId)
        });
      },
    }),
    {
      name: 'cart-storage', // localStorage キー
      partialize: (state) => ({ cart: state.cart }), // productDetailsCache は永続化しない
    }
  )
);

export default useCartStore; 