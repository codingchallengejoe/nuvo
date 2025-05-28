import { Grid, Typography } from '@mui/material'
import { ProductsCheckout } from '../../Types/Product'

interface ProductProps {
  holder: ProductsCheckout
}

export default function SuccessProductItem(props: ProductProps) {
  return (
    <Grid container display='flex' flexDirection='row' alignItems='center'>
      <Typography variant='body2' fontWeight={800}>
        {props.holder.product.name}
      </Typography>
    </Grid>
  )
}
