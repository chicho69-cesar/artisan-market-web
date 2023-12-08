import { AppContainer } from '@/modules/shared/components'
import { useTheme } from '@/modules/shared/store'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const theme = useTheme((state) => state)

  return (
    <AppContainer>
      <div className='flex flex-col items-center justify-center w-full gap-2 h-96'>
        <h1 className='text-6xl font-semibold text-center text-gray'>
          404 | Not Found
        </h1>

        <p className='text-lg text-gray'>
          La pagina que estas buscando no existe
        </p>

        <Link to='/home' className={`py-1 px-4 mt-4 text-white font-bold rounded-md shadow-md bg-${theme.mainColor} hover:shadow-none hover:-translate-y-0.5 transition`}>
          Regresa al inicio
        </Link>
      </div>
    </AppContainer>
  )
}
