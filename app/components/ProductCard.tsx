import React from 'react'
import AddToCart from './AddToCart'

const ProductCard = () => {
  return (
    <div className='p-4 border rounded-full w-fit mt-6 bg-black hover:bg-white hover:text-black transition-all'>
        <AddToCart />
    </div>
  )
}

export default ProductCard