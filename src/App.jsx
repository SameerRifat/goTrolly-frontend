import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import HomePage from './scenes/HomePage'
import LoginPage from './scenes/user/LoginPage'
import CommonNavbar from './components/CommonNavbar'
import RegisterPage from './scenes/user/RegisterPage'
import Search from './scenes/Search'
import ForgotPassword from './scenes/user/ForgotPassword'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import FlashSalePage from './scenes/flashSale/FlashSalePage'
import NewArrivals from './scenes/newArrival/NewArrivals'
import ProductsPage from './scenes/products/ProductsPage'
import TopSelling from './scenes/topSelling/TopSelling'
import Audio from './scenes/audio/Audio'
import SmartPhones from './scenes/samartPhones/SamartPhones'
import ChargingAndPower from './scenes/chargingAndPower/ChargingAndPower'
import Dashboard from './dashboard/Dashboard'
import { loadUser } from './features/user/userSlice'
import { useDispatch } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import ProductsGrid from './dashboard/product/ProductsGrid'
import AddProduct from './dashboard/product/AddProduct'
import Orders from './dashboard/order/Orders'
import Users from './dashboard/user/Users'
import ProductReviews from './dashboard/product/ProductReviews'
import Transactions from './dashboard/transaction/Transactions'
import OnDemandOrders from './dashboard/order/OnDemandOrders'
import Brands from './dashboard/brands/Brands'
import Categories from './dashboard/categories/Categories'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductTypes from './dashboard/productType/ProductTypes'
import AdminProductDetails from './dashboard/product/ProductDetails'
import UpdateProduct from './dashboard/product/UpdateProduct'
import ProductDetails from './scenes/products/ProductDetails'
import Cart from './scenes/cart/Cart'
import ProductsList from './dashboard/product/ProductsList'


const App = () => {
  const { pathname } = useLocation()
  // console.log(pathname)
  const isLogin = ((pathname.startsWith('/login')) || (pathname.startsWith('/register')))
  const isAdmin = (pathname.startsWith('/admin'))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return (
    <>
      {!isAdmin && <CommonNavbar />}
      {isLogin || !isAdmin && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/flashSale' element={<FlashSalePage />} />
        <Route path='/newArrivals' element={<NewArrivals />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/topSelling' element={<TopSelling />} />
        <Route path='/audio' element={<Audio />} />
        <Route path='/smartPhones' element={<SmartPhones />} />
        <Route path='/chargingAndPower' element={<ChargingAndPower />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<h1 className='text-center my-10 text-2xl font-medium'>Orders Page</h1>} />
        <Route path='/account' element={<h1 className='text-center my-10 text-2xl font-medium'>Profile Page</h1>} />

        <Route path='/admin' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductsGrid /></ProtectedRoute>}></Route>
          <Route path='/admin/productsList' element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>}></Route>
          <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><AddProduct /></ProtectedRoute>}></Route>
          <Route path='/admin/productDetails/:id' element={<ProtectedRoute isAdmin={true}><AdminProductDetails /></ProtectedRoute>}></Route>
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}></Route>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><Orders /></ProtectedRoute>}></Route>
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><Users /></ProtectedRoute>}></Route>
          <Route path='/admin/statics' element={<ProtectedRoute isAdmin={true}><h1 className='text-white text-2xl'>Statics Page</h1></ProtectedRoute>}></Route>
          <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ProductReviews /></ProtectedRoute>}></Route>
          <Route path='/admin/transactions' element={<ProtectedRoute isAdmin={true}><Transactions /></ProtectedRoute>}></Route>
          <Route path='/admin/on-demand-orders' element={<ProtectedRoute isAdmin={true}><OnDemandOrders /></ProtectedRoute>}></Route>
          <Route path='/admin/brands' element={<ProtectedRoute isAdmin={true}><Brands /></ProtectedRoute>}></Route>
          <Route path='/admin/categories' element={<ProtectedRoute isAdmin={true}><Categories /></ProtectedRoute>}></Route>
          <Route path='/admin/productTypes' element={<ProtectedRoute isAdmin={true}><ProductTypes /></ProtectedRoute>}></Route>
        </Route>
        {/* <Route path='/admin' element={<Dashboard />} /> */}
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App