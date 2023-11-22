interface Props {
  source: string
  alt: string
}

export default function Avatar({ source, alt }: Props) {
  return (
    <img
      src={source}
      alt={alt}
      className='object-cover object-center w-12 h-12 rounded-full'
    />
  )
}
