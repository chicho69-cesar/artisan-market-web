import { useTheme } from '../store'
import { colors } from '../theme'

interface Props {
  bgColor?: string
  color?: string
  text: string
  onPress: () => void
}

export default function AppButton({ bgColor, color, onPress, text }: Props) {
  const theme = useTheme((state) => state)

  bgColor = bgColor ?? theme.mainColor
  color = color ?? colors.white

  return (
    <button className={`bg-${bgColor} text-${color} w-full py-1 px-4 shadow-sm font-semibold hover:shadow-none transition rounded-md`} onClick={onPress}>
      <p>
        {text}
      </p>
    </button>
  )
}
