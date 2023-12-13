import { IconPhotoPlus } from '@tabler/icons-react'
import { useEffect, useId, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/modules/auth/store'
import { Categories } from '@/modules/products/components'
import { getProductById } from '@/modules/products/services'
import { AppAlert, AppButton, AppContainer, AppHeader, AppInput, AppTextArea } from '@/modules/shared/components'
import { serverUrl } from '@/modules/shared/constants'
import { useNavigate } from '@/modules/shared/hooks'
import type { Product } from '@/modules/shared/interfaces'
import { useTheme } from '@/modules/shared/store'
import { colors } from '@/modules/shared/theme'
import { descriptionSchema, makeValidation, nameSchema, priceSchema, stockSchema } from '@/modules/shared/validations'
import { ProductImages } from '../components'
import { deleteProductImage, updateProduct, uploadProductImage } from '../services'
import { transformCategories } from '../utils/transform-categories'

interface Errors {
  name: string | null
  description: string | null
  price: string | null
  stock: string | null
  images: string | null
}

export default function EditProductScreen() {
  const { product: productParam } = useParams()
  const theme = useTheme((state) => state)
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const imageSelectorId = useId()
  const [product, setProduct] = useState<Product>()
  const [isAnError, setIsAnError] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [categories, setCategories] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [imageFileNames, setImageFileNames] = useState<string[]>([])
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

  useEffect(() => {
    if (productParam !== undefined) {
      getProduct(productParam)
    }
  }, [productParam])

  const getProduct = async (id: string) => {
    const productFromDB = await getProductById(Number(id))
    
    if (productFromDB != null) {
      setProduct(productFromDB)
  
      const textCategories = transformCategories(productFromDB.categories)
      handleChangeCategories(textCategories)
  
      setImages(productFromDB.images.map((image) => `${serverUrl}/storage/${image.link}`))
      setImageFileNames(productFromDB.images.map((image) => image.link))
  
      setName(productFromDB.name)
      setDescription(productFromDB.description)
      setPrice(productFromDB.price)
      setStock(productFromDB.stock)
    }
  }

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
      // Obtén los nombres de los archivos existentes
      const existingFileNames = imageFileNames

      // Filtra los nuevos archivos para evitar duplicados por nombre
      const newFiles = Array.from(e.target.files).filter(
        (file) => !existingFileNames.includes(file.name)
      )

      // Actualiza el estado de los archivos
      setFiles([...files, ...newFiles])

      // Actualiza el estado de las imágenes
      const newImages = newFiles.map((newFile) => URL.createObjectURL(newFile))
      setImages([...images, ...newImages])

      // Actualiza el estado de los nombres de archivos
      const newFileNames = newFiles.map((newFile) => newFile.name)
      setImageFileNames([...existingFileNames, ...newFileNames])
    }
  }

  const handleRemoveImage = async (index: number, item: string) => {
    if (item.includes('storage/product_images/')) {
      await deleteProductImage(item, auth.token!)
    }

    const updatedImages = [...images]
    updatedImages.splice(index, 1)

    const updatedFileNames = [...imageFileNames]
    updatedFileNames.splice(index, 1)

    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)

    setImages(updatedImages)
    setImageFileNames(updatedFileNames)
    setFiles(updatedFiles)
  }

  const handleEditProduct = async () => {
    if (images.length === 0 && files.length === 0) {
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

    if (product === undefined) return

    const response = await updateProduct(product.id, name, description, price, stock, categories, auth.token!)

    if (response != null) {
      files.map(async (image) => {
        await uploadProductImage(product.id, image, auth.token!)
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
        description='Ocurrió un error al editar el producto inténtalo de nuevo'
        title='Error!'
      />

      <div className='w-1/2 mx-auto'>
        <AppHeader
          title='Edita tu producto'
          description={`Edita el producto "${product?.name}"`}
        />

        <AppInput
          isInvalid={errors.name != null}
          label='Nombre'
          type='text'
          defaultValue={product?.name}
          onChangeText={setName}
          placeholder='Nombre del producto...'
          errorMessage={errors.name ?? ''}
        />

        <AppTextArea
          isInvalid={errors.description != null}
          label='Descripción'
          placeholder='Descripción del producto...'
          defaultValue={product?.description}
          onChangeText={setDescription}
          errorMessage={errors.description ?? ''}
        />

        <div className='flex flex-row items-center justify-between gap-4'>
          <AppInput
            isInvalid={errors.price != null}
            label='Precio'
            type='text'
            defaultValue={product?.price.toString()}
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
            defaultValue={product?.stock.toString()}
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
          defaultValue={transformCategories(product?.categories ?? [])}
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
          onRemoveImage={(index: number, item: string) => {
            handleRemoveImage(index, item)
          }}
        />

        <AppButton
          text='Guardar cambios'
          bgColor={theme.mainColor}
          color={colors.white}
          onPress={() => {
            handleEditProduct()
          }}
        />
      </div>
    </AppContainer>
  )
}
