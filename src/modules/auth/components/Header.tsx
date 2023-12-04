interface Props {
  text: string
}

export default function Header({ text }: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 px-4 py-16 rounded-lg bg-semiWhite/75'>
      <img
        src='/logo.png'
        alt='Logo Artisan Market'
        className='object-cover object-center w-48 rounded-md h-36'
      />

      <section className='w-full mt-4'>
        <h2 className='text-4xl font-bold text-center text-gray'>
          ArtisanMarket
        </h2>

        <h3 className='text-xl font-medium text-center text-gray'>
          {text}
        </h3>
      </section>
    </div>
  )
}
