import { useNavigate as useNavigateReactRouter } from 'react-router-dom'

export function useNavigate() {
  const navigator = useNavigateReactRouter()

  const navigate = (screen: string) => {
    navigator(screen)
  }

  const navigateWithParams = (screen: string, params: any) => {
    navigator(`${screen}/${params}`)
  }

  const navigateBetweenRoutes = (router: string, route: string, params: any) => {
    console.log('Navigating between routes:', router, route, params)
    navigator(`${route}/${params}`)
  }

  return {
    navigate,
    navigateWithParams,
    navigateBetweenRoutes
  }
}
