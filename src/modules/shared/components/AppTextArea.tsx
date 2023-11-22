import { IconAlertCircleFilled } from '@tabler/icons-react'
import { useId } from 'react'

interface Props {
  isInvalid: boolean
  label: string
  placeholder: string
  defaultValue?: string
  errorMessage?: string
  onChangeText: (text: string) => void
}

export default function AppTextArea({ isInvalid, label, placeholder, defaultValue = '', errorMessage, onChangeText }: Props) {
  const inputId = useId()

  return (
    <div className='w-full mt-2'>
      <label htmlFor={inputId} className={`text-sm ${isInvalid ? 'text-red' : 'text-gray'}`}>
        {label}
      </label>

      <textarea
        rows={3}
        id={inputId}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`outline-none w-full py-1 resize-y px-3 rounded-md border ${isInvalid ? 'text-red border-red' : 'text-gray border-lightGray'}`}
        onChange={(e) => onChangeText(e.target.value)}
      />

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
