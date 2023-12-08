import { useEffect, useState } from 'react'

import { AppAlert, AppButton, AppContainer, AppInput } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { emailSchema, lastnameSchema, makeValidation, nameSchema, passwordSchema } from '@/modules/shared/validations'
import { AuthContainer, Header } from '../components'
import { signUp } from '../services'
import { useAuth } from '../store'

interface Errors {
  name: string | null
  lastname: string | null
  email: string | null
  password: string | null
  retypePassword: string | null
}

export default function SignUpScreen() {
  const auth = useAuth((state) => state)
  const theme = useTheme((state) => state)
  const { navigate } = useNavigate()

  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [role, setRole] = useState('user')
  const [isAnError, setIsAnError] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    name: null,
    lastname: null,
    email: null,
    password: null,
    retypePassword: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleSignUp = async () => {
    const validatedName = await makeValidation(nameSchema, name)
    const validatedLastname = await makeValidation(lastnameSchema, lastname)
    const validatedEmail = await makeValidation(emailSchema, email)
    const validatedPassword = await makeValidation(passwordSchema, password)

    setErrors({
      name: validatedName,
      lastname: validatedLastname,
      email: validatedEmail,
      password: validatedPassword,
      retypePassword: null
    })

    if (
      validatedName != null ||
      validatedLastname != null ||
      validatedEmail != null ||
      validatedPassword != null
    ) return

    setErrors({
      name: null,
      lastname: null,
      email: null,
      password: null,
      retypePassword: password !== retypePassword ? 'Las contraseñas no coinciden' : null
    })

    if (password !== retypePassword) return

    const response = await signUp(name, lastname, email, password, retypePassword, role)

    if (response != null) {
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
        description='Ocurrió un error al intentar registrarte'
        title='Error!'
      />

      <AuthContainer>
        <Header text='Regístrate para continuar'/>

        <div>
          <h3 className='text-2xl font-medium text-gray'>
            Regístrate para continuar
          </h3>

          <AppInput
            isInvalid={errors.name != null}
            label='Nombre'
            type='text'
            onChangeText={setName}
            placeholder='Nombre'
            errorMessage={errors.name ?? ''}
          />

          <AppInput
            isInvalid={errors.lastname != null}
            label='Apellidos'
            type='text'
            onChangeText={setLastname}
            placeholder='Apellidos'
            errorMessage={errors.lastname ?? ''}
          />

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

          <AppInput
            isInvalid={errors.retypePassword != null}
            label='Confirmar'
            type='password'
            onChangeText={setRetypePassword}
            placeholder='Confirmar password'
            errorMessage={errors.retypePassword ?? ''}
          />

          <div className='flex items-center justify-center gap-4 my-4'>
            <div className='flex items-center justify-start gap-1'>
              <input
                type="radio"
                id="user"
                name='role'
                className={`accent-${theme.mainColor}`}
                onChange={() => setRole('user')}
              />

              <label htmlFor="user" className='font-light text-gray'>
                Usuario
              </label>
            </div>

            <div className='flex items-center justify-start gap-1'>
              <input
                type="radio"
                id="seller"
                name='role'
                className={`accent-${theme.mainColor}`}
                onChange={() => setRole('seller')}
              />

              <label htmlFor="seller" className='font-light text-gray'>
                Seller
              </label>
            </div>
          </div>

          <AppButton
            bgColor={theme.mainColor}
            color={colors.white}
            text='Regístrate'
            onPress={() => {
              handleSignUp()
            }}
          />

          <section>
            <p className='mt-6 font-medium text-center text-gray'>
              ¿Ya tienes cuenta?{' '}
              <span onClick={() => navigate('/sign-in')} className={`font-bold cursor-pointer text-${theme.mainColor}`}>
                Inicia sesión aquí
              </span>
            </p>
          </section>
        </div>
      </AuthContainer>
    </AppContainer>
  )
}
