import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
  },
});

export const { setSelectedItem, clearSelectedItem } = dataSlice.actions;
export default dataSlice.reducer;
