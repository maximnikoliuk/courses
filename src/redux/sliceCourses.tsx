import { createSlice } from '@reduxjs/toolkit';
import { StateCourses } from '../types/CoursesTypes';

const initialState: StateCourses = {
  coursesList: [],
  totalCount: 7
};

export const sliceCourses = createSlice({
  name: 'auth',
  initialState: initialState as StateCourses,
  reducers: {
    setCourses: (state, { payload }) => {
      state.coursesList = payload;
    },
    reset: () => initialState,
  },
});

export const {
  setCourses,
} = sliceCourses.actions;

export default sliceCourses.reducer;