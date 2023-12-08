import { useEffect } from 'react'

import { AppButton, AppContainer, AppHeader, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'

export default function RecoverPasswordScreen() {
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  return (
    <AppContainer>
      <AppHeader
        title='Recupera tu contraseña'
        description='Te enviaremos una nueva contraseña de acceso a tu correo.'
      />

      <AppInput
        isInvalid={false}
        label='Email'
        type='text'
        onChangeText={() => {}}
        placeholder='Email'
        errorMessage='This is not a valid email'
      />

      <div className='mt-4' />

      <AppButton
        text='Enviar contraseña de acceso'
        onPress={() => {}}
      />

      <section>
        <p className='mt-6 font-medium text-center text-gray'>
          ¿Aún no tienes cuenta?{' '}
          <span onClick={() => navigate('/sign-up')} className={`font-bold cursor-pointer text-${theme.mainColor}`}>
            Regístrate
          </span>
        </p>
      </section>
    </AppContainer>
  )
}
