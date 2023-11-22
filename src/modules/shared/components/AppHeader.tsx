interface Props {
  title: string
  description: string
}

export default function AppHeader({ title, description }: Props) {
  return (
    <div className='w-full mb-4'>
      <h2 className='w-full font-sans text-2xl font-semibold text-left text-gray'>
        {title}
      </h2>

      <p className='w-full font-sans text-left text-gray'>
        {description}
      </p>
    </div>
  )
}
