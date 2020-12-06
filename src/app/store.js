import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../features/heroes/heroesSlice';
import modalReducer from '../features/modal/modalSlice';

export default configureStore({
  reducer: {
    heroes: heroesReducer,
    modal: modalReducer
  },
});
