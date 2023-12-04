import type { User } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'
import { longDateFormatter } from '@/modules/shared/utils/date-formatter'
import { OrderStatus } from '../types/order.d'

interface Props {
  client: User
  total: number
  noOfProducts: number
  date: string
  status: string
  navToOrder: () => void
  isAdminOrder?: boolean
  navToClient?: () => void
}

export default function Order({ client, date, noOfProducts, status, total, navToOrder, isAdminOrder = false, navToClient }: Props) {
  const theme = useTheme((state) => state)

  return (
    <div className='flex flex-col p-3 mb-2 gap-[0.125rem] rounded-md border border-lightGray'>
      {isAdminOrder && (
        <div className='flex flex-row items-center justify-start'>
          <p className='text-lg font-medium text-gray'>
            Cliente:{' '}
          </p>

          <span onClick={() => navToClient?.()} className={`text-lg cursor-pointer font-semibold text-${theme.mainColor}`}>
            {client.name} {client.lastname}
          </span>
        </div>
      )}

      <p className='text-xl font-semibold text-gray'>
        Total:{' '}
        <span className={`font-bold text-2xl text-${theme.mainColor}`}>
          {currencyFormatter.format(total)}
        </span>
      </p>
      
      <p className='text-xl font-semibold text-gray'>
        No. de productos:{' '}
        <span className={`font-bold text-2xl text-${theme.mainColor}`}>
          {noOfProducts}
        </span>
      </p>
      
      <p className='font-semibold text-gray'>
        Fecha:{' '}
        <span className={`font-bold text-${theme.mainColor}`}>
          {longDateFormatter.format(new Date(date))}
        </span>
      </p>

      <div className='flex items-center justify-between mt-2'>
        <div className={
          `py-2 px-6 rounded-full border-2
          ${
            status === OrderStatus.pending
              ? 'border-lightGray'
              : status === OrderStatus.paid
                ? 'border-green'
                : 'border-red'
          }`
        }>
          {status === OrderStatus.pending ? (
            <p className={`font-semibold text-center text-lightGray`}>
              Pendiente
            </p>
          ) : status === OrderStatus.paid ? (
            <p className={`font-semibold text-center text-green`}>
              Pagada
            </p>
          ) : (
            <p className={`font-semibold text-center text-red`}>
              Cancelada
            </p>
          )}
        </div>

        <span onClick={() => navToOrder()} className={`font-medium cursor-pointer text-${theme.mainColor}`}>
          Ver orden
        </span>
      </div>
    </div>
  )
}
