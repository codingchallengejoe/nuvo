import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#6A52FF',
    },
    secondary: {
      main: '#3C4257',
    },
    error: {
      main: '#FF6363',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#000',
    },
  },

  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: '10px 12px !important',
        },
      },
    },
  },
})

export default theme
