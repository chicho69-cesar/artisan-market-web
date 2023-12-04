import { useTheme } from '@/modules/shared/store'
import { IconTrash } from '@tabler/icons-react'

interface Props {
  images: string[]
  onRemoveImage: (index: number, image: string) => void
}

export default function ProductImages({ images, onRemoveImage }: Props) {
  const theme = useTheme((state) => state)

  if (images.length === 0) {
    return (
      <div className='flex flex-row items-center justify-start my-4'>
        <div className={`w-24 h-36 border-4 border-dashed grid place-content-center rounded-md p-2 border-${theme.mainColor}`}>
          <p className={`font-bold text-center text-xl text-${theme.mainColor}`}>
            No Images
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-row flex-wrap items-center justify-start gap-4 my-4'>
      {images.map((image, index) => (
        <div key={image} className='flex flex-col items-center justify-center w-24 gap-1 shadow'>
          <img
            src={image}
            alt={image}
            className='object-cover object-center w-24 rounded-sm h-36'
          />

          <button
            onClick={() => onRemoveImage(index, image)}
            className={`bg-${theme.mainColor} py-1 px-2 rounded-md text-center`}
          >
            <IconTrash
              size={24}
              className='font-semibold text-white'
            />
          </button>
        </div>
      ))}
    </div>
  )
}
