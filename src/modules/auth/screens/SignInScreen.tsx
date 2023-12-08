import { useEffect, useState } from 'react'

import { AppAlert, AppButton, AppContainer, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { emailSchema, makeValidation, passwordSchema } from '@/modules/shared/validations'
import { AuthContainer, Header, SocialLogin } from '../components'
import { signIn } from '../services'
import { useAuth } from '../store'
import { setSession } from '../utils/session'

interface Errors {
  email: string | null
  password: string | null
}

export default function SignInScreen() {
  const auth = useAuth((state) => state)
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [isAnError, setIsAnError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleSignIn = async () => {
    const validatedEmail = await makeValidation(emailSchema, email)
    const validatedPassword = await makeValidation(passwordSchema, password)

    setErrors({
      email: validatedEmail,
      password: validatedPassword
    })

    if (validatedEmail != null || validatedPassword != null) return

    const response = await signIn(email, password)

    if (response != null) {
      if (rememberMe) {
        setSession({
          isLoggedIn: true,
          token: response.token,
          user: response.user
        })
      }

      auth.authenticate(response.user, response.token)
    } else {
      setIsAnError(true)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Error al iniciar sesión. Revisa tu email y tu contraseña'
        title='Error!'
      />

      <AuthContainer>
        <Header text='Iniciar sesión' />
        
        <div>
          <h3 className='text-2xl font-medium text-gray'>
            Iniciar Sesión
          </h3>

          <AppInput
            isInvalid={errors.email != null}
            label='Email'
            type='text'
            onChangeText={setEmail}
            placeholder='Email'
            errorMessage={errors.email ?? ''}
          />

          <AppInput
            isInvalid={errors.password != null}
            label='Password'
            type='password'
            onChangeText={setPassword}
            placeholder='Password'
            errorMessage={errors.password ?? ''}
          />

          <p onClick={() => navigate('/recover-password')} className={`mt-4 font-semibold text-right cursor-pointer text-${theme.mainColor}`}>
            ¿Olvidaste tu contraseña?
          </p>

          <div className='flex items-center justify-start gap-1 my-4'>
            <input
              type="checkbox"
              id="remember"
              className={`accent-${theme.mainColor}`}
              onChange={() => setRememberMe(!rememberMe)}
            />

            <label htmlFor="remember" className='font-light text-gray'>
              Recuérdame y mantén mi sesión
            </label>
          </div>

          <AppButton
            bgColor={theme.mainColor}
            color={colors.white}
            text='Iniciar sesión'
            onPress={() => {
              handleSignIn()
            }}
          />

          <p className='my-4 font-medium text-center'>
            ó
          </p>

          <section className='flex items-center justify-center gap-4'>
            <SocialLogin
              alt='Facebook'
              image='/facebook.png'
              name='Facebook'
              onPress={() => { console.log('Facebook') }}
            />

            <SocialLogin
              alt='Google'
              image='/google.png'
              name='Google'
              onPress={() => { console.log('Google') }}
            />
          </section>

          <section>
            <p className='mt-6 font-medium text-center text-gray'>
              ¿Aún no tienes cuenta?{' '}
              <span onClick={() => navigate('/sign-up')} className={`font-bold cursor-pointer text-${theme.mainColor}`}>
                Regístrate
              </span>
            </p>
          </section>
        </div>
      </AuthContainer>
    </AppContainer>
  )
}
