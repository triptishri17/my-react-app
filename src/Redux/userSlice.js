import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      // state.list.push(action.payload);
      state.list = action.payload

    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

