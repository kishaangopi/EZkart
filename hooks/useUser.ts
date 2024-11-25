import { create } from "zustand";
export interface UserDetails {
  amazon: boolean;
  flipkart: boolean;
  meesho: boolean;
  mynta: boolean;
  image: string;
  accountId: string;
  email: string;
  name: string;
}

interface User {
  user: UserDetails;
  setUser: (value: UserDetails) => void;
}

const useUser = create<User>((set) => ({
  user: {
    amazon: true,
    flipkart: true,
    meesho: false,
    mynta: false,
    image: "",
    accountId: "",
    email: "",
    name: "",
  },
  setUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
}));
export default useUser;
