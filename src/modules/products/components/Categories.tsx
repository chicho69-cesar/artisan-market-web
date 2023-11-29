import type { Category } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'

interface Props {
  categories: Category[]
  mt?: string
  w?: string
}

export default function Categories({ categories, mt = '4', w = '100%' }: Props) {
  const theme = useTheme((state) => state)

  return (
    <div className={`flex flex-row flex-wrap justify-start items-center gap-2 w-[${w}] mt-${mt}`}>
      {categories.map((category) => (
        <span key={category.id} className={`py-[0.125rem] px-2 text-sm rounded-md bg-${theme.mainColor} text-white font-medium`}>
          {category.name}
        </span>
      ))}
    </div>
  )
}
