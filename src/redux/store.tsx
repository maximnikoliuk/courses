import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import sliceCourses from "./sliceCourses";
import sliceFilters from "./sliceFilters";
import sliceNotifs from "./sliceNotifs";

export const store = configureStore({
  reducer: combineReducers({
    courses: sliceCourses,
    filters: sliceFilters,
    notifs: sliceNotifs
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;