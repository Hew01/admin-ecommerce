import {create} from 'zustand';

type State = {
  name: string;
  brand: string;
  description: string;
  price: number;
  detailInfo: string;
  category: string;
  amount: number;
  publishStatus: string;
  instock: boolean;
  images: string[];
  setName: (name: string) => void;
  setBrand: (brand: string) => void;
  setDescription: (description: string) => void;
  setPrice: (price: number) => void;
  setDetailInfo: (detailInfo: string) => void;
  setCategory: (category: string) => void;
  setAmount: (amount: number) => void;
  setPublishStatus: (publishStatus: string) => void;
  setInstock: (instock: boolean) => void;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

export const useStore = create<State>((set) => ({
  name: '',
  brand: '',
  description: '',
  price: 0,
  detailInfo: '',
  category: '',
  amount: 0,
  publishStatus: 'published',
  instock: false,
  images: [],
  setName: (name) => set({ name }),
  setBrand: (brand) => set({ brand }),
  setDescription: (description) => set({ description }),
  setPrice: (price) => set({ price }),
  setDetailInfo: (detailInfo) => set({ detailInfo }),
  setCategory: (category) => set({ category }),
  setAmount: (amount) => set({ amount }),
  setPublishStatus: (publishStatus) => set({ publishStatus }),
  setInstock: (instock) => set({ instock }),
  setImages: (value) =>
    set((state) => ({
      ...state,
      images: typeof value === 'function' ? value(state.images) : value,
    })),
}));