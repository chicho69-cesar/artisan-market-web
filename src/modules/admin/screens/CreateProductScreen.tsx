import { IconPhotoPlus } from '@tabler/icons-react'
import { useEffect, useId, useState } from 'react'

import { useAuth } from '@/modules/auth/store'
import { Categories } from '@/modules/products/components'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { descriptionSchema, makeValidation, nameSchema, priceSchema, stockSchema } from '@/modules/shared/validations'
import { ProductImages } from '../components'
import { addProduct, uploadProductImage } from '../services'

interface Errors {
  name: string | null
  description: string | null
  price: string | null
  stock: string | null
  images: string | null
}

export default function CreateProductScreen() {
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const imageSelectorId = useId()
  const [isAnError, setIsAnError] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Errors>({
    name: null,
    description: null,
    price: null,
    stock: null,
    images: null
  })

  useEffect(() => {
    theme.changeMainColor()
  }, [])

  const handleChangeCategories = (text: string) => {
    const textToCheck = text.replace(/, /g, ',')

    if (textToCheck.includes(',')) {
      setCategories(textToCheck.split(','))
    } else {
      setCategories([textToCheck])
    }
  }

  const handlePickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const arrayFiles = [...files, ...filesArray]
      setFiles(arrayFiles)
      setImages(arrayFiles.map((arrayFile) => URL.createObjectURL(arrayFile)))
    }
  }

  const handleCreateProduct = async () => {
    if (files.length === 0) {
      setErrors({
        ...errors,
        images: 'Debes agregar al menos una imagen'
      })

      return
    }

    const [validatedName, validatedDescription, validatedPrice, validatedStock] = await Promise.all([
      makeValidation(nameSchema, name),
      makeValidation(descriptionSchema, description),
      makeValidation(priceSchema, price),
      makeValidation(stockSchema, stock)
    ])

    setErrors({
      name: validatedName,
      description: validatedDescription,
      price: validatedPrice,
      stock: validatedStock,
      images: null
    })

    if (
      validatedName != null ||
      validatedDescription != null ||
      validatedPrice != null ||
      validatedStock != null
    ) return

    const response = await addProduct(name, description, price, stock, categories, auth.token!)

    if (response != null) {
      files.map(async (image) => {
        await uploadProductImage(response.id, image, auth.token!)
      })

      navigate('/my-products')
    } else {
      setIsAnError(true)
    }
  }

  return (
    <AppContainer>
      <AppAlert
        alertIsOpen={isAnError}
        setAlertIsOpen={setIsAnError}
        description='Ocurrió un error al agregar el producto inténtalo de nuevo'
        title='Error!'
      />

      <div className='w-1/2 mx-auto'>
        <AppHeader
          title='Crea tu producto'
          description='Agrega un nuevo producto a tu colección'
        />

        <AppInput
          isInvalid={errors.name != null}
          label='Nombre'
          type='text'
          onChangeText={setName}
          placeholder='Nombre del producto...'
          errorMessage={errors.name ?? ''}
        />

        <AppTextArea
          isInvalid={errors.description != null}
          label='Descripción'
          placeholder='Descripción del producto...'
          onChangeText={setDescription}
          errorMessage={errors.description ?? ''}
        />

        <div className='flex flex-row items-center justify-between gap-4'>
          <AppInput
            isInvalid={errors.price != null}
            label='Precio'
            type='text'
            isGrouped
            onChangeText={(text) => {
              setPrice(parseFloat(text))
            }}
            placeholder='$00.00'
            errorMessage={errors.price ?? ''}
          />

          <AppInput
            isInvalid={errors.stock != null}
            label='Stock'
            type='text'
            isGrouped
            onChangeText={(text) => {
              setStock(parseInt(text))
            }}
            placeholder='00'
            errorMessage={errors.stock ?? ''}
          />
        </div>

        <AppInput
          isInvalid={false}
          label='Categorías'
          type='text'
          onChangeText={handleChangeCategories}
          placeholder='Escribe las categorías separados por ,'
          errorMessage='Error in the categories'
        />

        <Categories
          categories={categories.map((category, index) => ({
            id: index, name: category
          }))}
        />

        <div className='mt-4'>
          <input
            type="file"
            accept="image/*"
            id={imageSelectorId}
            multiple
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

        {errors.images != null && (
          <p className='font-bold text-red'>
            {errors.images}
          </p>
        )}

        <ProductImages
          images={images}
          onRemoveImage={(index: number) => {
            const updatedImages = [...images]
            updatedImages.splice(index, 1)

            const updatedFiles = [...files]
            updatedFiles.splice(index, 1)

            setImages(updatedImages)
            setFiles(updatedFiles)
          }}
        />

        <AppButton
          text='Agregar producto'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {
            handleCreateProduct()
          }}
        />
      </div>
    </AppContainer>
  )
}
