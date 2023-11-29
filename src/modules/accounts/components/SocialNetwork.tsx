interface Props {
  social: string | null
  name: string
  image: any
}

export default function SocialNetwork({ social, name, image }: Props) {
  return (
    <a href={social ?? ''} rel='noreferrer' target='_blank'>
      <img
        src={image}
        alt={name}
        className='w-8 h-8 rounded-full'
      />
    </a>
  )
}
