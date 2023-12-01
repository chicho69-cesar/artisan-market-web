import { blankImage, serverUrl } from '@/modules/shared/constants'
import type { Product as ProductType } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  product: ProductType
  onPress?: () => void
  isAdmin?: boolean
  quantitySold?: number
}

export default function Product({ product, isAdmin = false, quantitySold, onPress }: Props) {
  const theme = useTheme((state) => state)

  return (
    <article onClick={onPress} className='cursor-pointer shadow-sm rounded-md border border-lightGray transition hover:shadow-lg hover:scale-[1.025] w-full'>
      <div className='w-full p-3 mb-4'>
        <section className='grid place-content-center'>
          <img
            src={
              product.images == null || product.images === undefined || product.images.length === 0
                ? blankImage : `${serverUrl}/storage/${product.images[0].link}`
            }
            alt={product.name}
            className='w-[100%] h-80 rounded-md object-cover object-center'
          />
        </section>

        <section className='flex items-center justify-between w-full gap-4 mt-4'>
          <p className='grid w-2/3 h-16 text-lg leading-5 text-gray place-content-center'>
            {product.name}
          </p>

          <p className='flex-1 text-xl font-semibold text-gray'>
            {currencyFormatter.format(product.price)}
          </p>
        </section>

        {isAdmin && (
          <section className='flex items-center justify-between w-full gap-4 mt-4'>
            <p className='font-medium text-gray'>
              Productos vendidos:{' '}
            </p>

            <span className={`py-2 px-4 text-lg font-semibold text-white rounded-md shadow-sm bg-${theme.mainColor}`}>
              {quantitySold}
            </span>
          </section>
        )}
      </div>
    </article>
  )
}
