import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import Country from '../../model/type'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3)
    }
  })
)

interface Props {
  rows: Country[],
  onRowSelect: Function,
  onEditClick: Function
}

export default function CountryTable ({ rows, onRowSelect, onEditClick }: Props) {
  const classes = useStyles()
  const columns: ColDef[] = [
    {
      field: 'flag',
      headerName: 'Flag',
      headerAlign: 'center',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: function flag (params: ValueFormatterParams) {
        return <Avatar alt="flag-avatar" src={`${params.value}`} className={classes.small} />
      }
    },
    { field: 'name', headerName: 'Name', headerAlign: 'center', width: 150 },
    { field: 'region', headerName: 'Region', headerAlign: 'center', width: 80 },
    { field: 'alpha3Code', headerName: 'Code', headerAlign: 'center', width: 70 },
    { field: 'population', headerName: 'Population', headerAlign: 'center', width: 150 },
    {
      field: 'id',
      headerName: 'Action',
      headerAlign: 'center',
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: function flag (params: ValueFormatterParams) {
        return (
          <IconButton aria-label="edit" onClick={() => { onEditClick(params.value) }}>
            <EditIcon fontSize="small" />
          </IconButton>
        )
      }
    }
  ]
  return (
    <div style={{ height: 450, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        onSelectionChange={({ rowIds }) => onRowSelect(rowIds)}
        showToolbar
        disableColumnMenu
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}
