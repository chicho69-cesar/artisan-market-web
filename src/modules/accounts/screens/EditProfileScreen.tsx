import { IconPhotoPlus } from '@tabler/icons-react'
import { useEffect, useId, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { blankImage, serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { makeValidation, nameSchema } from '@/modules/shared/validations'
import { addUserSocial, editProfile, uploadProfilePicture } from '../services'

interface Errors {
  name: string | null
  lastname: string | null
}

export default function EditProfileScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const imageSelectorId = useId()
  const [isAnError, setIsAnError] = useState(false)
  const [name, setName] = useState(auth.user?.name ?? '')
  const [lastname, setLastName] = useState(auth.user?.lastname ?? '')
  const [bio, setBio] = useState(auth.user?.biography ?? '')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [freeMarket, setFreeMarket] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Errors>({
    name: null,
    lastname: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  useEffect(() => {
    setImage(
      auth.user?.picture == null || auth.user.picture === undefined
        ? blankImage : `${serverUrl}/storage/${auth.user.picture}`
    )
  }, [auth])

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const selectedFile = filesArray[0]
      setFile(selectedFile)
    }
  }

  const handleEdit = async () => {
    if (file == null) {
      return
    }

    const validatedName = await makeValidation(nameSchema, name)
    const validatedLastname = await makeValidation(nameSchema, lastname)

    setErrors({
      name: validatedName,
      lastname: validatedLastname
    })

    if (validatedName != null || validatedLastname != null) return

    await uploadProfilePicture(file, auth.token!)
    await addUserSocial(auth.token!, facebook, twitter, linkedin, freeMarket)

    const response = await editProfile(name, lastname, bio, auth.token!)

    if (response != null) {
      auth.updateAuthInfo(response)
      navigate('/profile')
    } else {
      setIsAnError(true)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Ocurrió un error inesperado inténtalo de nuevo'
        title='Error!'
      />

      <div className='w-1/2 mx-auto'>
        <AppHeader
          title='Edita tu información'
          description='Edita la información que aparecerá en tu perfil'
        />

        <AppInput
          isInvalid={errors.name != null}
          label='Nombre'
          type='text'
          onChangeText={setName}
          placeholder='Nombre'
          defaultValue={name}
          errorMessage={errors.name ?? ''}
        />

        <AppInput
          isInvalid={errors.lastname != null}
          label='Apellidos'
          type='text'
          onChangeText={setLastName}
          placeholder='Apellidos'
          defaultValue={lastname}
          errorMessage={errors.lastname ?? ''}
        />

        <AppTextArea
          isInvalid={false}
          label='Biografía'
          onChangeText={setBio}
          placeholder='Historia del usuario...'
          defaultValue={bio}
          errorMessage='Error on the biography'
        />

        <div className='flex flex-row items-center justify-center w-full gap-4 my-4'>
          <div>
            <input
              type="file"
              accept="image/*"
              id={imageSelectorId}
              multiple={false}
              onChange={handlePickImage}
              className='hidden'
            />

            <label
              htmlFor={imageSelectorId}
              className={`flex flex-row justify-center items-center gap-2 bg-${theme.mainColor} text-white py-1 px-3 rounded-md cursor-pointer`}
            >
              <IconPhotoPlus />
              Seleccionar
            </label>
          </div>

          <img
            src={
              file == null 
                ? image ?? blankImage
                : URL.createObjectURL(file)
            }
            alt='User picture'
            className='object-cover object-center h-64 rounded-md w-44'
          />
        </div>

        <div className='flex flex-row items-center justify-between gap-4'>
          <AppInput
            isInvalid={false}
            label='Facebook'
            type='text'
            isGrouped
            onChangeText={setFacebook}
            placeholder='Facebook'
            errorMessage='Error in the facebook'
          />

          <AppInput
            isInvalid={false}
            label='Twitter'
            type='text'
            isGrouped
            onChangeText={setTwitter}
            placeholder='Twitter'
            errorMessage='Error in the twitter'
          />
        </div>

        <div className='flex flex-row items-center justify-between gap-4'>
          <AppInput
            isInvalid={false}
            label='LinkedIn'
            type='text'
            isGrouped
            onChangeText={setLinkedin}
            placeholder='LinkedIn'
            errorMessage='Error in the linkedin'
          />

          <AppInput
            isInvalid={false}
            label='Mercado Libre'
            type='text'
            isGrouped
            onChangeText={setFreeMarket}
            placeholder='Mercado Libre'
            errorMessage='Error in the free market'
          />
        </div>

        <div className='mt-4' />

        <AppButton
          text='Guardar información'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {
            handleEdit()
          }}
        />
      </div>
    </AppContainer>
  )
}
