import React from 'react'
import 'fontsource-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Countries from './features/countries/Countries'

function App () {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Countries />
      </Container>
    </div>
  )
}

export default App
