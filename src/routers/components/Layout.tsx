import { IconHome, IconSearch } from '@tabler/icons-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Layout() {
  const nav = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    nav(`/search?q=${'hola'}`)
  }
  
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='w-full py-2 border border-transparent border-b-lightGray'>
        <div className='w-[90%] max-w-6xl mx-auto flex flex-row flex-nowrap justify-between items-center'>
          <section>
            <Link to='/'>
              <img
                src='/logo.png'
                alt='Artisan Market logo'
                className='object-contain object-center w-24 rounded-sm shadow-sm'
              />
            </Link>
          </section>

          <section>
            <nav>
              <ul className='flex flex-row gap-3'>
                {/* TODO: make menu for role and auth users */}
                <li>
                  <Link to='/home' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                    <IconHome color='#25292e' size={24} />
                    Inicio
                  </Link>
                </li>

                <li>
                  <Link to='/home' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                    <IconHome color='#25292e' size={24} />
                    Inicio
                  </Link>
                </li>
              </ul>
            </nav>
          </section>

          <section>
            <form className='flex gap-2' onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Buscar'
                className='border-[1px] border-lightGray py-1 px-4 rounded-md outline-none'
              />

              <button
                type='submit'
                className='p-2 transition rounded-md shadow-md bg-semiWhite hover:shadow-none'
              >
                <IconSearch color='#25292e' size={24} />
              </button>
            </form>
          </section>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
