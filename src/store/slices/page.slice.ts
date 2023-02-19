import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: 1,
  reducers: {
    setPreviousPage(state) {
      return state - 1;
    },
    setNextPage(state) {
      return state + 1;
    },
    setPage(state, action) {
      return action.payload;
    },
  },
});

export const { setPreviousPage, setNextPage, setPage } = pageSlice.actions;
