import { AppButton } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { currencyFormatter } from '@/modules/shared/utils/currency-formatter'

interface Props {
  noOfProducts: number
  subTotal: number
  tax: number
  total: number
  onPress: () => void
}

export default function CartResume({ noOfProducts, subTotal, tax, total, onPress }: Props) {
  const theme = useTheme((state) => state)

  return (
    <div className='flex flex-col w-full gap-1 mb-4 border rounded-md flex-nowrap border-lightGray'>
      <h3 className='p-3 text-2xl border-b border-lightGray text-gray'>
        Orden
      </h3>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          No. de productos
        </p>

        <p className='text-xl font-semibold text-gray'>
          {noOfProducts}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          Sub Total
        </p>

        <p className='text-xl font-semibold text-gray'>
          {currencyFormatter.format(subTotal)}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='font-medium text-gray'>
          Impuestos (16%)
        </p>

        <p className='text-xl font-semibold text-gray'>
          {currencyFormatter.format(tax)}
        </p>
      </div>

      <div className='flex flex-row items-center justify-between w-full gap-2 px-3'>
        <p className='text-xl font-semibold text-gray'>
          Total
        </p>

        <p className='text-3xl font-bold text-gray'>
          {currencyFormatter.format(total)}
        </p>
      </div>

      <div className='w-full p-3'>
        <AppButton
          text='Continuar'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={onPress}
        />
      </div>
    </div>
  )
}
