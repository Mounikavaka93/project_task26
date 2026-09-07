import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { Login, Signup } from './pages/AuthForm'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Collection } from './pages/Collection'
import { Home } from './pages/Home'
import { OrderSuccess } from './pages/OrderSuccess'
import { WatchDetails } from './pages/WatchDetails'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="collection" element={<Collection />} />
              <Route path="watch/:id" element={<WatchDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
