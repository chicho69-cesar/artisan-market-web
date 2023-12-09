import { blankImage, serverUrl } from '@/modules/shared/constants'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { IconCircleMinus, IconCirclePlus, IconTrash } from '@tabler/icons-react'

interface Props {
  product: Product
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
  removeProduct: () => void
}

export default function ProductCart({ product, quantity, decreaseQuantity, increaseQuantity, removeProduct }: Props) {
  const theme = useTheme((state) => state)

  return (
    <div className='flex w-full flex-row justify-between border-b-[0.5px] border-lightGray items-center gap-6 py-2'>
      <figure>
        <img
          src={
            product.images.length === 0
              ? blankImage : `${serverUrl}/storage/${product.images[0].link}`
          }
          alt={product.name}
          className='object-cover object-center w-20 h-32 rounded-md'
        />
      </figure>

      <div className='flex flex-col items-center justify-start w-full gap-2'>
        <div className='flex flex-row items-center justify-between w-full gap-2'>
          <p className='text-xl text-gray'>
            {product.name}
          </p>

          <p className='text-2xl font-semibold text-gray'>
            {currencyFormatter.format(product.price)}
          </p>
        </div>

        <div className='flex items-center justify-between w-full gap-4'>
          <div className='flex items-center justify-start flex-1 gap-2'>
            <button onClick={decreaseQuantity}>
              <IconCircleMinus
                size={32}
                className={`text-gray font-bold text-${theme.mainColor}`}
              />
            </button>

            <p className='text-2xl font-medium text-gray'>
              {quantity}
            </p>

            <button onClick={increaseQuantity}>
              <IconCirclePlus
                size={32}
                className={`text-gray font-bold text-${theme.mainColor}`}
              />
            </button>
          </div>

          <button onClick={removeProduct}>
            <IconTrash
              size={32}
              className='font-medium text-red'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
