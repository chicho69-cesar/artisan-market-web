interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className='grid w-full grid-cols-2 gap-12'>
      {children}
    </div>
  )
}
