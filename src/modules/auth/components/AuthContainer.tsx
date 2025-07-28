interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export default function AuthContainer({ children }: Props) {
  return (
    <div className='grid w-full grid-cols-2 gap-12'>
      {children}
    </div>
  )
}
