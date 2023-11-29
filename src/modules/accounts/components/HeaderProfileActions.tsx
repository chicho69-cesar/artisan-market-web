import { signOut } from '@/modules/auth/services'
import { useAuth } from '@/modules/auth/store'
import { clearSession } from '@/modules/auth/utils/session'
import { ActionButton } from '@/modules/shared/components'
import { useNavigate } from '@/modules/shared/hooks'
import { Roles } from '@/modules/shared/interfaces'
import { IconLogout, IconSquarePlus } from '@tabler/icons-react'

export default function HeaderProfileActions() {
  const auth = useAuth((state) => state)
  const { navigate } = useNavigate()

  const handleLogout = async () => {
    const response = await signOut(auth.token ?? '')

    if (response != null) {
      auth.logout()
    }
  }

  return (
    <div className='flex items-center justify-end gap-2 mt-4'>
      {auth.user?.role_id === Roles.seller && (
        <ActionButton
          onPress={() => {
            navigate('/create-product')
          }}
        >
          <IconSquarePlus
            size={24}
          />

          <p>
            Agregar producto
          </p>
        </ActionButton>
      )}

      <ActionButton
        onPress={() => {
          handleLogout()
          clearSession()
        }}
        bgColor='red'
      >
        <IconLogout
          size={24}
        />

        <p>
          Cerrar sesión
        </p>
      </ActionButton>
    </div>
  )
}
