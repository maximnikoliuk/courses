import { createSlice } from '@reduxjs/toolkit';
import { FiltersState } from '../types/FilterTypes';

const initialState: FiltersState = {
  filtersList: {
    title: '',
    level: 'ALL',
    language: 'ALL'
  }
};

export const sliceFilters = createSlice({
  name: 'auth',
  initialState: initialState as FiltersState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filtersList = payload;
    },
    reset: () => initialState,
  },
});

export const {
  setFilters,
} = sliceFilters.actions;

export default sliceFilters.reducer;