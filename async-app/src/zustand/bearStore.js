import { create } from "zustand";

export const userBearsStore = create((set) => {
  return {
    bears: 0,
    // set을 받아서 bears를 바꿔주도록 할것임
    increase: () => {
      set((state) => {
        // state값
        return {
          bears: state.bears + 1,
        };
      });
    },
    init: () => {
      set(() => {
        return {
          bears: 0,
        };
      });
    },
  };
});
