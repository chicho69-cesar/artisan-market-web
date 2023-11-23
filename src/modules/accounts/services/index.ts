import { api } from '@/config/api'
import type { Follow, PictureUpload, Response, Social, User } from '@/modules/shared/interfaces'

export async function getUserById(id: number, token: string) {
  try {
    const { data: response } = await api.get<Response<User>>(`/users/user-info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function editProfile(name: string, lastname: string, biography: string, token: string) {
  try {
    const { data: response } = await api.put<Response<User>>(
      '/users/edit',
      {
        name,
        lastname,
        biography
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function followUser(userFollow: number, token: string) {
  try {
    const { data: response } = await api.patch<Response<Follow>>(
      '/users/follow-user',
      {
        user_follow: userFollow
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function unfollowUser(userFollow: number, token: string) {
  try {
    const { data: response } = await api.patch<Response<User>>(
      '/users/unfollow-user',
      {
        user_follow: userFollow
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getFollowers(userId: number, token: string) {
  try {
    const { data: response } = await api.get<Response<User[]>>(`/users/followers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getFollowings(userId: number, token: string) {
  try {
    const { data: response } = await api.get<Response<User[]>>(`/users/followings/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function uploadProfilePicture(file: File, token: string) {
  const formData = new FormData()
  formData.append('picture', file)

  try {
    const { data: response } = await api.post<Response<PictureUpload>>(
      '/users/upload-profile-picture',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log('Error uploading file')
    return null
  }
}

export async function addUserSocial(token: string, facebook: string | null, twitter: string | null, linkedin: string | null, freeMarket: string | null) {
  try {
    const { data: response } = await api.post<Response<Social>>(
      '/socials/add-social',
      {
        facebook,
        twitter,
        linkedin,
        freeMarket
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}

export async function getSocialsForAnUser(userId: number, token: string) {
  try {
    const { data: response } = await api.get<Response<Social>>(`/socials/get-socials/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { data } = response
    return data
  } catch (error: any) {
    console.log(`Error en el servicio: ${error}`)
    return null
  }
}
