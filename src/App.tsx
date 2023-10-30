import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/products/get-products')
      const data = await response.json()

      setProducts(data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])

  return (
    <>
      <h1 className='text-3xl font-bold text-center'>
        Hello world!
      </h1>
    </>
  )
}

export default App
