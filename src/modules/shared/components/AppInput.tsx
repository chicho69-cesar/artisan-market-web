import { IconAlertCircleFilled, IconEyeClosed, IconEyeFilled } from '@tabler/icons-react'
import { useId, useState } from 'react'

interface Props {
  isInvalid: boolean
  label: string
  type: 'text' | 'password' | undefined
  placeholder: string
  defaultValue?: string
  isGrouped?: boolean
  errorMessage?: string
  onChangeText: (text: string) => void
}

export default function AppInput({ isInvalid, label, type, placeholder, defaultValue = '', isGrouped = false, errorMessage, onChangeText }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const inputId = useId()

  return (
    <div className={`${isGrouped ? 'w-[48%]' : 'w-full'} mt-2`}>
      <label htmlFor={inputId} className={`text-sm ${isInvalid ? 'text-red' : 'text-gray'}`}>
        {label}
      </label>

      <div className={`flex w-full justify-between items-center gap-1 rounded-md overflow-hidden border ${isInvalid ? 'border-red' : 'border-lightGray'}`}>
        <input
          type={(showPassword || type === 'text') ? 'text' : 'password'}
          id={inputId}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`outline-none inline-block w-full py-1 px-3 ${isInvalid ? 'text-red' : 'text-gray'}`}
          onChange={(e) => onChangeText(e.target.value)}
        />

        {type === 'password' && (
          <span className='px-2 py-1 cursor-pointer' onClick={() => setShowPassword((show) => !show)}>
            {showPassword ? (
              <IconEyeFilled size={20} color='#25262e' />
            ) : (
              <IconEyeClosed size={20} color='#25262e' />
            )}
          </span>
        )}
      </div>

      {isInvalid && (
        <div className='flex items-center justify-start gap-2'>
          <IconAlertCircleFilled size={20} className='text-red' />

          <p className='font-bold text-red'>
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  )
}
