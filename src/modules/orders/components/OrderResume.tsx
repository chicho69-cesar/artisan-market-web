import { useAuth } from '@/modules/auth/store'
import type { CartOrderData } from '@/modules/cart/types/cart'
import { AppButton } from '@/modules/shared/components'
import type { Address, User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { OrderStatus } from '../types/order.d'

interface Props {
  user: User
  address: Address
  orderData: CartOrderData
  status: OrderStatus
  confirmOrder?: () => void
  payOrder?: () => void
  cancelOrder?: () => void
}

export default function OrderResume({ user, address, orderData, status, confirmOrder, payOrder, cancelOrder }: Props) {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)

  return (
    <div className='flex flex-col gap-1 mb-4 border rounded-md border-lightGray'>
      <h3 className='p-3 text-2xl border-b border-lightGray text-gray'>
        Dirección de entrega
      </h3>

      <p className='px-3 text-gray'>
        {user.name} {user.lastname}
      </p>

      <p className='px-3 text-gray'>
        {address.no_out},{' '}
        {((address?.no_in) != null) ? `${address.no_in}, ` : ''}
        {address.street}
      </p>

      <p className='px-3 text-gray'>
        {address.city}, {address.state}, {address.country}
      </p>

      <p className='px-3 text-gray'>
        {address.phone}
      </p>

      <h3 className='p-3 text-2xl border-y border-lightGray text-gray'>
        Resumen del pedido
      </h3>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          No. de productos
        </p>

        <p className='text-xl font-semibold text-gray'>
          {orderData.noOfProducts}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          Sub Total
        </p>

        <p className='text-xl font-semibold text-gray'>
          {currencyFormatter.format(orderData.subTotal)}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          Impuestos (16%)
        </p>

        <p className='text-xl font-semibold text-gray'>
          {currencyFormatter.format(orderData.tax)}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='text-xl font-semibold text-gray'>
          Total
        </p>

        <p className='text-3xl font-bold text-gray'>
          {currencyFormatter.format(orderData.total)}
        </p>
      </div>

      <div className='w-full p-3'>
        {status === OrderStatus.unconfirmed ? (
          <AppButton
            text='Confirmar pedido'
            bgColor={theme.mainColor}
            color={colors.white}
            onPress={() => {
              confirmOrder?.()
            }}
          />
        ) : status === OrderStatus.pending ? (
          <>
            {auth.user?.id === user.id ? (
              <div className='flex flex-row items-center justify-between gap-2'>
                <button
                  onClick={() => payOrder?.()}
                  className='w-full shadow-sm bg-[#ffd140] p-2 rounded-md grid place-content-center'
                >
                  <img
                    src='/paypal.png'
                    alt='PayPal'
                    className='h-8'
                  />
                </button>

                <button
                  onClick={() => cancelOrder?.()}
                  className='w-full shadow-sm bg-red p-[0.6rem] rounded-md grid place-content-center'
                >
                  <p className='text-xl font-bold text-center text-white'>
                    Cancelar
                  </p>
                </button>
              </div>
            ) : (
              <div className='w-full p-2 border rounded-full border-lightGray'>
                <p className='text-lg font-bold text-center text-lightGray'>
                  Pendiente
                </p>
              </div>
            )}
          </>
        ) : status === OrderStatus.paid ? (
          <div className='w-full p-2 border rounded-full border-green'>
            <p className='text-lg font-bold text-center text-green'>
              Pagada
            </p>
          </div>
        ) : (
          <div className='w-full p-2 border rounded-full border-red'>
            <p className='text-lg font-bold text-center text-red'>
              Cancelada
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
