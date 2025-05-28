import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import theme from '../../theme'
import { useProductStore } from '../ProductList/store'
import { useFormik } from 'formik'
import validationSchema from './validation'
import * as cardValidator from 'card-validator'

export default function Checkout() {
  const [cardType, setCardType] = useState<string | null>(null)
  const [displayResponse, setDisplayResponse] = useState<boolean>()
  const { total, items } = useProductStore((state) => state)

  const formik = useFormik({
    initialValues: {
      email: '',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const submittedValues = {
        ...values,
        cardNumber: values.cardNumber.replace(/\s/g, ''),
      }
      console.log(JSON.stringify(submittedValues, null, 2))
      setDisplayResponse(true)
    },
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formik.submitForm()
  }

  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid
        display='flex'
        flexDirection='column'
        gap={2}
        maxWidth={'700px'}
        m={4}
        sx={{
          [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
          },
        }}
      >
        <Grid xs={12} item mb={4}>
          <Typography align='center' variant='h4' fontWeight={800}>
            Checkout
          </Typography>
        </Grid>

        <Box
          display='flex'
          justifyContent='center'
          alignItems='stretch'
          flexDirection='column'
          mt={8}
        >
          {Object.keys(items).map((product) => (
            <Grid
              key={items[product].id}
              container
              display='flex'
              alignItems='center'
              mb={2}
              xs={12}
              sx={{
                [theme.breakpoints.down('sm')]: {
                  maxWidth: '100%',
                  minWidth: '100%',
                },
              }}
            >
              <Grid item xs={1.5}>
                <Avatar
                  alt={items[product].name}
                  sx={{
                    backgroundColor: 'white',
                    border: '4px solid #6A52FF',
                    width: 30,
                    height: 30,
                  }}
                />
              </Grid>
              <Grid item xs={2} display='flex' flexDirection='column'>
                <Typography variant='body2' fontWeight={800}>
                  {items[product].name}
                </Typography>

                <Typography color='primary' variant='caption'>
                  {items[product].currency} {items[product].price}
                </Typography>
              </Grid>

              <Grid xs={8.5} display='flex' flexDirection='column' textAlign='end'>
                <Typography color='primary' fontWeight={800} variant='caption'>
                  {items[product].price} {items[product].currency}
                </Typography>

                <Typography color='gray' variant='body2'>
                  qty: {items[product].quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>

        <form onSubmit={onSubmit} style={{ maxWidth: '450px' }}>
          <Grid xs={12} item display='flex' flexDirection='column' gap={2} mt={4}>
            <Typography fontWeight={800}>Email</Typography>
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              id='email'
              name='email'
              variant='outlined'
              placeholder='john@example.com'
            />

            <Typography fontWeight={800}>Card Information</Typography>
            <TextField
              onChange={(e) => {
                const formattedValue = e.target.value
                  .replace(/\s?/g, '')
                  .replace(/(\d{4})/g, '$1 ')
                  .trim()
                formik.setFieldValue('cardNumber', formattedValue)
                const cleanedValue = formattedValue.replace(/\s/g, '')
                const validationResult = cardValidator.number(cleanedValue)
                setCardType(validationResult.card ? validationResult.card.type : null)
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              name='cardNumber'
              id='cardNumber'
              variant='outlined'
              placeholder='1234 1234 1234 1234'
              inputProps={{ maxLength: 19 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {cardType === 'visa' && (
                      <Typography variant='body2' sx={{ color: '#1a1f71', fontWeight: 'bold' }}>
                        VISA
                      </Typography>
                    )}
                    {cardType === 'mastercard' && (
                      <Typography variant='body2' sx={{ color: '#eb001b', fontWeight: 'bold' }}>
                        MC
                      </Typography>
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Grid container>
              <Grid xs={6} item>
                <TextField
                  placeholder='MM/YY'
                  value={formik.values.expirationDate}
                  name='expirationDate'
                  id='cardDate'
                  variant='outlined'
                  fullWidth
                  inputProps={{
                    maxLength: 5,
                  }}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '')
                    if (value.length > 2) {
                      value = value.substring(0, 2) + '/' + value.substring(2, 4)
                    }
                    formik.setFieldValue('expirationDate', value)
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
                  helperText={formik.touched.expirationDate && formik.errors.expirationDate}
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                  value={formik.values.cvc}
                  name='cvc'
                  placeholder='123'
                  id='cardCvc'
                  variant='outlined'
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Box component='img' src='cvc.png' sx={{ width: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item justifyContent='center' display='flex' mt={4}>
              <Button variant='contained' color='secondary' type='submit'>
                Pay {total} USD
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={displayResponse}
        autoHideDuration={1000}
        onClose={() => setDisplayResponse(false)}
      >
        <Alert severity='success'>Payment Success!</Alert>
      </Snackbar>
    </Grid>
  )
}
