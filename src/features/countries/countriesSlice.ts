import { createSlice } from '@reduxjs/toolkit'

import Country from '../../model/type'

interface CountriesState {
  countries: Country[]
}

const initialState: CountriesState = {
  countries: []
}

// Slice
const slice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state, { payload }) => {
      state.countries = [...state.countries, payload]
    },
    updateCountry: (state, { payload }) => {
      const index = state.countries.findIndex(country => country.id === payload.id)
      state.countries[index] = payload
    },
    deleteCountries: (state, { payload }) => {
      state.countries = state.countries.filter(country => !payload.includes(country.id))
    }
  }
})
export default slice.reducer

// Actions
export const {
  addCountry,
  updateCountry,
  deleteCountries
} = slice.actions

// State
export const selectCountries = (state: CountriesState) => state.countries
