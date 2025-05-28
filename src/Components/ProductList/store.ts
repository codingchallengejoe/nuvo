import { create } from 'zustand'
import { Product } from '../../Types/Product'

interface IProductStore {
  totalItems: number
  items: Record<string, Product>
  total: number
  addToCart: (item: Product) => void
  removeFromCart: (item: Product) => void
  setProducts: (items: Array<Product>) => void
}

export const useProductStore = create<IProductStore>((set) => ({
  totalItems: 0,
  items: {},
  total: 0,
  setProducts: (items: Array<Product>) => {
    set({
      items: items.reduce((acc, cur) => {
        return { ...acc, [cur.id]: cur }
      }, {}),
    })
  },
  addToCart: (item: Product) =>
    set((state) => ({
      items: {
        ...state.items,
        [item.id]: {
          ...state.items[item.id],
          quantity: state.items[item.id].quantity + 1,
        },
      },
      totalItems: state.totalItems + 1,
      total: state.total + item.price,
    })),
  removeFromCart: (item: Product) =>
    set((state) =>
      state.items[item.id].quantity > 0
        ? {
            items: {
              ...state.items,
              [item.id]: {
                ...state.items[item.id],
                quantity: state.items[item.id].quantity - 1,
              },
            },
            totalItems: state.totalItems - 1,
            total: state.total - item.price,
          }
        : state,
    ),
}))
