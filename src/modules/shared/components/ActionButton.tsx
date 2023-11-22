import { useTheme } from '../store'
import { colors } from '../theme'

interface Props {
  bgColor?: string
  color?: string
  children: JSX.Element | JSX.Element[] | React.ReactNode
  onPress: () => void
}

export default function ActionButton({ bgColor, color, children, onPress }: Props) {
  const theme = useTheme((state) => state)

  bgColor = bgColor ?? theme.mainColor
  color = color ?? colors.white

  return (
    <button className={`bg-${bgColor} text-${color} w-full py-2 px-4 flex justify-center items-center gap-2 shadow-sm font-semibold hover:shadow-none transition rounded-md`} onClick={onPress}>
      {children}
    </button>
  )
}
