import { useAuth } from '@/modules/auth/store'
import { useCart } from '@/modules/cart/store'
import { useTheme } from '@/modules/shared/store'
import { IconHome, IconLogin2, /*  IconMessageCircleHeart, */ IconSearch, IconShoppingCart, IconUserCircle, IconUserPlus } from '@tabler/icons-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import MenuDropDown from './MenuDropDown'

export default function Layout() {
  const nav = useNavigate()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const cart = useCart((state) => state.cart)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const q = data.q as string

    nav({
      pathname: '/search',
      search: `?q=${q}`,
    })
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
                className='object-contain object-center w-32 h-24 rounded-sm shadow-sm'
              />
            </Link>
          </section>

          <section>
            <nav>
              <ul className='flex flex-row gap-3'>
                {auth.isLoggedIn ? (
                  <>
                    <li>
                      <Link to='/home' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconHome color='#25292e' size={20} />
                        Inicio
                      </Link>
                    </li>
                    
                    <li className='relative'>
                      <Link to='/cart' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconShoppingCart color='#25292e' size={20} />
                        Carrito
                      </Link>

                      <span className={`absolute px-2 py-1 text-xs font-bold text-white rounded-full -top-2 -right-2 bg-${theme.mainColor}`}>
                        {cart.length}
                      </span>
                    </li>
                    
                    {/* <li>
                      <Link to='/chats' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconMessageCircleHeart color='#25292e' size={20} />
                        Chats
                      </Link>
                    </li> */}
                    
                    <li>
                      <Link to='/profile' className='flex gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconUserCircle color='#25292e' size={20} />
                        Perfil
                      </Link>
                    </li>

                    <li>
                      <MenuDropDown />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to='/sign-in' className='flex items-center gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconLogin2 color='#25292e' size={20} />
                        Iniciar sesión
                      </Link>
                    </li>

                    <li>
                      <Link to='/sign-up' className='flex items-center gap-[2px] py-1 px-2 rounded-md hover:bg-semiWhite hover:shadow-sm'>
                        <IconUserPlus color='#25292e' size={20} />
                        Regístrate
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </section>

          <section>
            <form className='flex gap-2' onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Buscar'
                name='q'
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
