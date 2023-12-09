import { useEffect, useMemo, useState } from 'react'

import { useCart } from '@/modules/cart/store'
import { ActionButton, AppContainer, TabBarItem } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { IconBookmark, IconBookmarkFilled, IconCash, IconShoppingCartPlus, IconStarFilled } from '@tabler/icons-react'
import { Categories, ImagesCarousel, Reviews } from '../components'
import { useReviews } from '../hooks'
import { useActiveProduct } from '../store'

export default function DetailsScreen() {
  const theme = useTheme((state) => state)
  const cart = useCart((state) => state)
  const { product } = useActiveProduct((state) => state)
  const { reviews } = useReviews(product?.id ?? 0)
  const { navigateBetweenRoutes } = useNavigate()

  const [isFavorite, setIsFavorite] = useState(false)
  const [showDescription, setShowDescription] = useState(true)

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const rateAvg: number = useMemo(() => {
    if (reviews != null && reviews !== undefined) {
      if (reviews.length === 0) return 0
      return reviews.reduce((acc, review) => acc + review.rate, 0) / reviews.length
    }

    return 0
  }, [reviews])

  return (
    <AppContainer>
      <div className='flex flex-row items-start justify-between gap-12 flex-nowrap'>
        <section className='w-1/3'>
          <ImagesCarousel images={product?.images} />
        </section>

        <section className='flex-1'>  
          <div className='flex flex-row items-center justify-between w-full gap-2'>
            <div className='w-[68%] flex flex-col gap-1'>
              <h3 className='text-2xl font-medium text-gray'>
                {product?.name}
              </h3>

              <div className='flex flex-row items-center gap-1'>
                <p className='text-gray'>
                  De{' '}
                </p>

                <span
                  onClick={() => {
                    if ((product?.seller) != null) {
                      navigateBetweenRoutes('', '/user-profile', product.seller.id)
                    }
                  }}
                  className={`font-semibold cursor-pointer text-${theme.mainColor}`}
                >
                  {product?.seller.name} {product?.seller.lastname}
                </span>
              </div>
            </div>

            <section className='flex flex-row items-center justify-end gap-1'>
              <IconStarFilled
                size={20}
                className='font-bold text-yellow'
              />

              <span className='text-lg text-gray'>
                {rateAvg}
              </span>

              <span className='text-lg font-light text-gray'>
                ({reviews?.length ?? 0})
              </span>
            </section>
          </div>

          <div className='flex flex-row items-center justify-between mt-4'>
            <div>
              <p className='w-full text-2xl font-semibold text-left text-gray'>
                {currencyFormatter.format(product?.price ?? 0)}
              </p>

              <p className='text-lg'>
                Disponible:{' '}
                <span className={`text-xl font-bold text-${theme.mainColor}`}>
                  {product?.stock}
                </span>
              </p>
            </div>

            <button>
              {isFavorite ? (
                <IconBookmarkFilled
                  size={32}
                  className={`font-medium text-${theme.mainColor}`}
                  onClick={() => setIsFavorite((isFav) => !isFav)}
                />
              ) : (
                <IconBookmark
                  size={32}
                  className={`font-medium text-${theme.mainColor}`}
                  onClick={() => setIsFavorite((isFav) => !isFav)}
                />
              )}
            </button>
          </div>

          <Categories categories={product?.categories ?? []} />

          <div className='flex flex-row items-center justify-start gap-1 my-4'>
            <TabBarItem
              active={showDescription}
              text='Descripción'
              onPress={() => {
                setShowDescription(true)
              }}
            />

            <TabBarItem
              active={!showDescription}
              text='Reviews'
              onPress={() => {
                setShowDescription(false)
              }}
            />
          </div>

          {showDescription ? (
            <>
              <p className='w-full text-gray'>
                {product?.description}
              </p>

              <div className='flex items-center justify-between gap-4 mt-4'>
                <ActionButton
                  bgColor={theme.mainColor}
                  onPress={() => {
                    if (product!.stock > 0) {
                      cart.addProductToCart(product!)
                    }
                  }}
                >
                  <IconShoppingCartPlus
                    size={18}
                  />

                  <span>
                    Agregar al carrito
                  </span>
                </ActionButton>

                <ActionButton bgColor={colors.gray} onPress={() => {}}>
                  <IconCash
                    size={18}
                  />

                  <span>
                    Comprar ahora
                  </span>
                </ActionButton>
              </div>
            </>
          ) : (
            <Reviews reviews={reviews ?? []} chunkReviews />
          )}
        </section>

      </div>
    </AppContainer>
  )
}
