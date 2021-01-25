import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import countriesReducer from './features/countries/countriesSlice'

const store = configureStore({
  reducer: countriesReducer,
  middleware: [...getDefaultMiddleware()],
  devTools: true
})

export default store
