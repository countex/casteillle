import create from 'zustand';

const useStore = create((set) => ({
    cartItems: [],
    addToCart: (product) => set((state) => ({ cartItems: [...state.cartItems, product] })),
    clearCart: () => set({ cartItems: [] }),
}));

export default useStore;