import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { EditProfileScreen, FollowersScreen, FollowingsScreen, ProfileScreen, UserScreen } from '@/modules/accounts/screens'
import { AdminOrderScreen, CreateProductScreen, DashboardScreen, EditProductScreen, MyProductsScreen, OrdersScreen } from '@/modules/admin/screens'
import { RecoverPasswordScreen, SignInScreen, SignUpScreen } from '@/modules/auth/screens'
import { useAuth } from '@/modules/auth/store'
import { getSession } from '@/modules/auth/utils/session'
import { CartScreen } from '@/modules/cart/screens'
import { ChatScreen, ChatsScreen } from '@/modules/chats/screens'
import { AddressScreen, CheckoutScreen, OrderScreen, OrdersHistoryScreen } from '@/modules/orders/screens'
import { AddReviewScreen, DetailsScreen, HomeScreen, ReviewsScreen, SearchScreen } from '@/modules/products/screens'
import AlreadyAuthRoute from './components/AlreadyAuthRoute'
import LandingPage from './components/LandingPage'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import SellerRoute from './components/SellerRoute'
import NotFound from './components/NotFound'

export default function Router() {
  const auth = useAuth((state) => state)

  useEffect(() => {
    const getSessionFromStore = async () => {
      const userLogged = await getSession()

      if (userLogged != null) {
        auth.authenticate(userLogged.user!, userLogged.token!)
      }
    }

    getSessionFromStore()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />} />

          <Route
            path='/sign-in'
            element={
              <AlreadyAuthRoute>
                <SignInScreen />
              </AlreadyAuthRoute>
            }
          />

          <Route
            path='/sign-up'
            element={
              <AlreadyAuthRoute>
                <SignUpScreen />
              </AlreadyAuthRoute>
            }
          />

          <Route path='/recover-password' element={<RecoverPasswordScreen />} />
          
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/details/:product'
            element={
              <ProtectedRoute>
                <DetailsScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reviews/:product'
            element={
              <ProtectedRoute>
                <ReviewsScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/add-review/:product'
            element={
              <ProtectedRoute>
                <AddReviewScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/orders-history'
            element={
              <ProtectedRoute>
                <OrdersHistoryScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/create-product'
            element={
              <ProtectedRoute>
                <CreateProductScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/edit-products/:product'
            element={
              <ProtectedRoute>
                <EditProductScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/search'
            element={
              <ProtectedRoute>
                <SearchScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/cart'
            element={
              <ProtectedRoute>
                <CartScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/address'
            element={
              <ProtectedRoute>
                <AddressScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/checkout'
            element={
              <ProtectedRoute>
                <CheckoutScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/order/:order'
            element={
              <ProtectedRoute>
                <OrderScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin-order/:order'
            element={
              <SellerRoute>
                <AdminOrderScreen />
              </SellerRoute>
            }
          />

          <Route
            path='/chats'
            element={
              <ProtectedRoute>
                <ChatsScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/chat/:chat'
            element={
              <ProtectedRoute>
                <ChatScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          
          <Route
            path='/user-profile/:id'
            element={
              <ProtectedRoute>
                <UserScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/edit-profile'
            element={
              <ProtectedRoute>
                <EditProfileScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/followers/:id'
            element={
              <ProtectedRoute>
                <FollowersScreen />
              </ProtectedRoute>
            }
          />

          <Route
            path='/following/:id'
            element={
              <ProtectedRoute>
                <FollowingsScreen />
              </ProtectedRoute>
            }
          />
          
          <Route
            path='/dashboard'
            element={
              <SellerRoute>
                <DashboardScreen />
              </SellerRoute>
            }
          />

          <Route
            path='/my-products'
            element={
              <SellerRoute>
                <MyProductsScreen />
              </SellerRoute>
            }
          />

          <Route
            path='/orders'
            element={
              <SellerRoute>
                <OrdersScreen />
              </SellerRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
