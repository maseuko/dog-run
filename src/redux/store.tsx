import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication'

const store = configureStore({
  reducer: {auth: authenticationReducer}
});

export default store;

export type IRootState = ReturnType<typeof store.getState>
