interface Props {
  image: any
  alt: string
  name: string
  onPress: () => void
}

export default function SocialLogin({ alt, image, name, onPress }: Props) {
  return (
    <button onClick={onPress}>
      <img
        src={image}
        alt={`${alt}-${name}`}
        className='object-cover object-center w-12 h-12 rounded-full'
      />
    </button>
  )
}
