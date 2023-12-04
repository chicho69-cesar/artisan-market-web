import { Categories } from '@/modules/products/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { IconPencil } from '@tabler/icons-react'

interface Props {
  product: Product
}

export default function AdminProduct({ product }: Props) {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  return (
    <div className='flex flex-row items-start justify-between gap-3 p-2 mt-4 border rounded-md border-lightGray'>
      <img
        src={
          product.images.length === 0
            ? blankImage : `${serverUrl}/storage/${product.images[0].link}`
        }
        alt={product.name}
        className='self-center object-cover object-center w-32 h-56 rounded-md'
      />

      <div className='flex flex-col justify-between flex-1 h-full gap-4'>
        <div className='flex flex-col flex-1 gap-1'>
          <p className='text-lg font-medium text-gray text-ellipsis'>
            {product.name}
          </p>

          <p className='text-gray'>
            {
              product.description.length < 80
                ? product.description
                : product.description.slice(0, 80) + "..."
            }
          </p>

          <Categories categories={product.categories} mt='1' />

          <div className='flex flex-row items-center justify-between gap-4'>
            <p className='text-gray'>
              Precio:{' '}
              <span className={`font-semibold text-lg text-${theme.mainColor}`}>
                {currencyFormatter.format(product.price)}
              </span>
            </p>

            <p className='text-gray'>
              Stock:{' '}
              <span className={`font-semibold text-lg text-${theme.mainColor}`}>
                {product.stock}
              </span>
            </p>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            onClick={() => navigate(`/edit-products/${product.id}`)}
            className={`bg-${theme.mainColor} p-[0.35rem] rounded-full shadow hover:shadow-none transition-shadow`}
          >
            <IconPencil
              size={24}
              className='font-bold text-white'
            />
          </button>
        </div>
      </div>
    </div>
  )
}
