import React, { useState, useEffect, Fragment } from 'react'
import AutoComplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'

import getCountries from '../../services/countries'
import Country from '../../model/type'

interface Props {
  value: Country | null,
  onChange: Function
}

export default function CountryAutoComplete ({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Country[]>([])
  const [xValue, setXValue] = useState<Country | null>(null)
  const [inputValue, setInputValue] = useState('')
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      if (active) {
        const countries = await getCountries()
        setOptions(countries)
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (xValue !== value) onChange(xValue)
  }, [xValue])

  useEffect(() => {
    if ((value !== xValue)) {
      setXValue(value)
    }
  }, [value])

  return (
    <AutoComplete
      id="autocomplete-country"
      style={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(true)}
      getOptionSelected={(option: any, value) => option.name === value.name}
      getOptionLabel={(option: Country) => option.name}
      options={options}
      loading={loading}
      value={xValue}
      onChange={(_, newValue) => setXValue(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading
                  ? (
                  <CircularProgress color="inherit" size={20} />
                    )
                  : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}
