import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import UpdateIcon from '@material-ui/icons/Update'
import DeleteIcon from '@material-ui/icons/Delete'
import Alert from '@material-ui/lab/Alert'
import isEmpty from 'lodash.isempty'

import Country from '../../model/type'
import { useStyles } from './countriesStyles'
import {
  addCountry,
  updateCountry,
  deleteCountries,
  selectCountries
} from './countriesSlice'
import CountryAutoComplete from '../commons/CountryAutoComplete'
import CountryTable from '../commons/CountryTable'

function Countries () {
  const countries = useSelector(selectCountries)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [formData, setFormData] = useState<Country | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [alert, setAlert] = useState<boolean>(false)

  const handleSubmitForm = () => {
    if (formData) {
      if (isEmpty(selectedCountry)) {
        const index = countries.findIndex(country => country.id === formData.id)
        if (index >= 0) {
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
          }, 2000)
        } else {
          dispatch(addCountry(formData))
          setFormData(null)
        }
      } else {
        dispatch(updateCountry(formData))
        setSelectedCountry(null)
        setFormData(null)
      }
    }
  }

  const handleForm = (data: Object | number) => {
    let parsedData: any = { ...formData }
    if (typeof data === 'object' && data !== null) {
      parsedData = { ...parsedData, ...data }
    } else {
      parsedData = { ...parsedData, population: data }
    }
    setFormData(parsedData)
  }

  const handleDelete = () => {
    dispatch(deleteCountries(selectedRows))
  }

  useEffect(() => {
    const index = countries.findIndex(country => country.id === selectedCountry)
    if (index >= 0) setFormData(countries[index])
  }, [selectedCountry])

  return (
    <div className="Countries">
      {alert && (
        <Alert variant="outlined" severity="error" className={classes.alert}>
          Country is already existing on the list!
        </Alert>
      )}
      <div className={classes.header}>
        <form className={classes.form}>
          <CountryAutoComplete onChange={handleForm} value={formData} />
          <TextField
            name="population"
            label="Population"
            type="number"
            variant="outlined"
            value={formData?.population || 0}
            onChange={({ target }) => { handleForm(target.value) }}
          />
        </form>
        <div className={classes.actions}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={isEmpty(selectedCountry) ? <SaveIcon /> : <UpdateIcon /> }
            onClick={handleSubmitForm}
            disabled={!formData}
          >
            {isEmpty(selectedCountry) ? 'Add' : 'Update'} Country
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isEmpty(selectedRows)}
          >
          Delete
          </Button>
        </div>
      </div>
      <CountryTable
        rows={countries}
        onRowSelect={setSelectedRows}
        onEditClick={setSelectedCountry}
      />
    </div>
  )
}

export default Countries
