import ProductItem from './ProductItem'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Badge, Button, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { NavLink } from 'react-router-dom'
import { useProductStore } from './store'

export default function ProductList() {
  const { totalItems, items } = useProductStore((state) => state)

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' height='100%'>
      <Typography align='center' variant='h4' fontWeight={800} mt={8}>
        Products
      </Typography>
      <Box display='flex' justifyContent='center' flexDirection='row' mt={12}>
        <Grid xs={6} container item>
          {Object.keys(items).map((product, index) => (
            <ProductItem key={index} product={items[product]} />
          ))}
        </Grid>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        mt={12}
        alignItems='center'
      >
        <NavLink to={'/checkout'}>
          <Badge badgeContent={totalItems} color='error'>
            <Button
              color='primary'
              variant='contained'
              sx={{ borderRadius: '50%', minWidth: '25px', padding: 1 }}
            >
              <ShoppingCartOutlinedIcon fontSize='small' />
            </Button>
          </Badge>
        </NavLink>
        <Typography align='center' variant='body2' mt={1}>
          Checkout
        </Typography>
      </Box>
    </Box>
  )
}
