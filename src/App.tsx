import ProductList from './Components/ProductList/ProductList'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Components/Checkout/Checkout'
import SuccessPage from './Components/SuccessPage/Success'
import { useEffect } from 'react'
import { ProductHttpService } from './Http/Products.http.service'
import { useProductStore } from './Components/ProductList/store'
import { ProductsResponse } from './Types/Product'

function App() {
  const { setProducts } = useProductStore((state) => state)

  useEffect(() => {
    ProductHttpService.getProducts().then((data: ProductsResponse) => {
      setProducts(data.products)
    })
  }, [])

  return (
    <Router>
      <main className='App'>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thanks' element={<SuccessPage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
