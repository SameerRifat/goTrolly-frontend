import React, { useEffect, useState } from 'react'
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
import OrdersList from './dashboard/order/OrdersList'
// import Users from './dashboard/user/Users'
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
import Shipping from './scenes/cart/Shipping'
import ConfirmOrder from './scenes/cart/ConfirmOrder'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import API from './components/APIs/Api';
import Payment from './scenes/cart/Payment'
import OrderSuccess from './scenes/cart/OrderSuccess'
import MyOrders from './scenes/order/MyOrders'
import OrderDetails from './scenes/order/OrderDetails'
import Profile from './scenes/user/Profile'
import UpdateProfile from './scenes/user/UpdateProfile'
import UpdatePassword from './scenes/user/UpdatePassword'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import ProcessOrder from './dashboard/order/ProcessOrder'
import UsersList from './dashboard/user/UsersList'
const { http } = API();

const App = () => {
  const { pathname } = useLocation()
  // console.log(pathname)
  const isLogin = ((pathname.startsWith('/login')) || (pathname.startsWith('/register')) || (pathname.startsWith('/me/update')) || (pathname.startsWith('/password/update')))
  const isAdmin = (pathname.startsWith('/admin'))
  const dispatch = useDispatch()
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApiKey() {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    const { data } = await http.get("/api/v1/stripeapikey", config);
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey()
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
        <Route path='/products/:keyword' element={<ProductsPage />}></Route>
        <Route path='/topSelling' element={<TopSelling />} />
        <Route path='/audio' element={<Audio />} />
        <Route path='/smartPhones' element={<SmartPhones />} />
        <Route path='/chargingAndPower' element={<ChargingAndPower />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<AuthenticatedRoute ><Shipping /></AuthenticatedRoute>}></Route>
        <Route path='/order/confirm' element={<AuthenticatedRoute ><ConfirmOrder /></AuthenticatedRoute>}></Route>
        <Route path='/success' element={<AuthenticatedRoute ><OrderSuccess /></AuthenticatedRoute>}></Route>
        {/* <Route path='/shipping' element={<Shipping />} /> */}
        {/* <Route path='/order/confirm' element={<ConfirmOrder />} />
        <Route path='/success' element={<OrderSuccess />} /> */}
        {stripeApiKey && (
          <Route path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}></Route>
        )}
        {/* <Route path='/orders' element={<h1 className='text-center my-10 text-2xl font-medium'>Orders Page</h1>} /> */}
        <Route path='/orders' element={<AuthenticatedRoute ><MyOrders /></AuthenticatedRoute>}></Route>
        <Route path='/order/:id' element={<AuthenticatedRoute ><OrderDetails /></AuthenticatedRoute>}></Route>
        {/* <Route exact path="/orders" element={<MyOrders />}></Route>
        <Route path='/order/:id' element={<OrderDetails />} ></Route> */}
        {/* <Route path='/account' element={<h1 className='text-center my-10 text-2xl font-medium'>Profile Page</h1>} /> */}
        <Route path='/account' element={<AuthenticatedRoute ><Profile /></AuthenticatedRoute>}></Route>
        <Route path='/me/update' element={<AuthenticatedRoute ><UpdateProfile /></AuthenticatedRoute>}></Route>
        <Route path='/password/update' element={<AuthenticatedRoute ><UpdatePassword /></AuthenticatedRoute>}></Route>
        {/* <Route path='/account' element={<Profile />}></Route> */}
        {/* <Route path="me/update" element={<UpdateProfile />}></Route>
        <Route path="/password/update" element={<UpdatePassword />}></Route> */}

        <Route path='/admin' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>}>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductsGrid /></ProtectedRoute>}></Route>
          <Route path='/admin/productsList' element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>}></Route>
          <Route path='/admin/product' element={<ProtectedRoute isAdmin={true}><AddProduct /></ProtectedRoute>}></Route>
          <Route path='/admin/productDetails/:id' element={<ProtectedRoute isAdmin={true}><AdminProductDetails /></ProtectedRoute>}></Route>
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}></Route>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrdersList /></ProtectedRoute>}></Route>
          <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>}></Route>
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