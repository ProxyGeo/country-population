import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import Country from '../model/type'

const getCountries = async (): Promise<Country[]> => {
  const countries = await axios.get('https://restcountries.eu/rest/v2/all')
    .then(({ data }) => {
      const parsedData = data.map((country: Country) => {
        const { name, alpha3Code, region, flag } = country
        return {
          id: uuidv4(),
          name,
          alpha3Code,
          region,
          flag,
          population: (Math.floor(Math.random() * 1420000000))
        }
      })
      return parsedData
    })
    .catch((error) => error)

  return countries
}

export default getCountries
