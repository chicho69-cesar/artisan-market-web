interface Props {
  children: React.ReactNode | React.ReactNode[] | React.ReactNode
}

export default function AppContainer({ children }: Props) {
  return (
    <main className={`w-[95%] max-w-6xl mx-auto pt-8 pb-4 bg-white`}>
      {children}
    </main>
  )
}
