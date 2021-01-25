import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '20px 0'
    },
    form: {
      display: 'flex',
      '& > *': {
        margin: 'auto 5px'
      }
    },
    actions: {
      '& > *': {
        margin: 'auto 5px'
      }
    },
    alert: {
      margin: '10px'
    }
  })
)
