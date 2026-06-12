import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "easypc-cart";
const CartContext = createContext<CartContextValue | null>(null);

function loadStoredCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) return [];

  try {
    const parsedCart = JSON.parse(storedCart) as CartItem[];

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(
      (item) =>
        typeof item.productId === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId: string) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { productId, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId),
    );
  }

  function increaseQuantity(productId: string) {
    addToCart(productId);
  }

  function decreaseQuantity(productId: string) {
    setCart((currentCart) =>
      currentCart.flatMap((item) => {
        if (item.productId !== productId) return [item];
        if (item.quantity <= 1) return [];

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }

  function clearCart() {
    setCart([]);
  }

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
