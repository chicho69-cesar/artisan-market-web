import { IconBrandCashapp, IconBuildingStore, IconCreditCardFilled, IconCreditCardOff, IconPencilHeart, IconSquareRoundedXFilled, IconUser } from '@tabler/icons-react'

interface Props {
  quantity: number
  color: string
  icon: 'credit' | 'bill' | 'credit-off' | 'user' | 'store' | 'cancel' | 'pencil'
  text: string
}

export default function DashboardCard({ quantity, color, icon, text }: Props) {
  return (
    <div className='flex flex-col w-1/5 p-2 border rounded-md border-lightGray'>
      <div className='flex flex-row items-center justify-center gap-1'>
        {icon === 'credit' && <IconCreditCardFilled size={68} className={`text-${color} font-bold`} />}
        {icon === 'bill' && <IconBrandCashapp size={68} className={`text-${color} font-bold`} />}
        {icon === 'credit-off' && <IconCreditCardOff size={68} className={`text-${color} font-bold`} />}
        {icon === 'user' && <IconUser size={68} className={`text-${color} font-bold`} />}
        {icon === 'store' && <IconBuildingStore size={68} className={`text-${color} font-bold`} />}
        {icon === 'cancel' && <IconSquareRoundedXFilled size={68} className={`text-${color} font-bold`} />}
        {icon === 'pencil' && <IconPencilHeart size={68} className={`text-${color} font-bold`} />}

        <p className='text-3xl font-bold text-gray'>
          {quantity}
        </p>
      </div>

      <p className='font-medium text-center text-gray'>
        {text}
      </p>
    </div>
  )
}
