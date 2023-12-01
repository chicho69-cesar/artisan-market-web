import { IconShare } from '@tabler/icons-react'
import { useActiveProduct } from '../store'

export default function ShareProduct() {
  const productState = useActiveProduct((state) => state)

  return (
    <button
      onClick={() => {
        console.log(productState.product)
      }}
    >
      <IconShare
        size={20}
        className='font-semibold text-gray'
      />
    </button>
  )
}
