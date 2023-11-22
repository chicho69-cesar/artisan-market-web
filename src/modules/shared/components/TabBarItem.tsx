import { useTheme } from '../store'

interface Props {
  active: boolean
  text: string
  onPress: () => void
}

export default function TabBarItem({ active, onPress, text }: Props) {
  const theme = useTheme((state) => state)

  return (
    <span onClick={onPress} className={`py-1 px-2 font-medium border-b cursor-pointer ${active ? `border-${theme.mainColor} text-${theme.mainColor}` : 'border-white text-gray'}`}>
      {text}
    </span>
  )
}
