import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { addItemsToCart, remove_cart_item } from '../../features/cart/cartSlice';
// import CartItemCard from './cartItemCard';
import { NavLink, useNavigate } from 'react-router-dom';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector((state) => state.cart)
    const increaseQuantity = (id, qty, stock, color, size) => {
        const quantity = qty + 1;
        if (stock <= qty) {
            return;
        }
        const cartData = {
            id,
            quantity,
            color,
            size
        }
        dispatch(addItemsToCart(cartData))
    }
    const decreaseQuantity = (id, qty, color, size) => {
        // console.log("decrese clicked")
        const quantity = qty - 1;
        if (qty <= 1) {
            return;
        }
        const cartData = {
            id,
            quantity,
            color,
            size
        }
        dispatch(addItemsToCart(cartData))
    }
    const removeCartItem = (id) => {
        dispatch(remove_cart_item(id))
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    return (
        <>
            {cartItems.length == 0 ?
                <div className='w-[90%] h-[60vh] mx-auto flex flex-col justify-center items-center gap-4 pt-10'>
                    <RemoveShoppingCartIcon className='text-4xl text-orange-500' style={{fontSize: '40px'}} />
                    <h2>No Product in Your Cart</h2>
                    <NavLink to='/products' className='bg-broom text-black border-none outline-0 py-4 px-5'>View Products</NavLink>
                </div>
                :
                <div className='w-[90%] mx-auto pt-8'>
                    <h2 className='text-2xl font-medium my-7'>Shopping Cart</h2>
                    <div className="grid grid-cols-12 gap-y-20 lg:gap-x-20 pb-16">
                        <div className="col-span-12 lg:col-span-7 flex flex-col">
                            {cartItems && cartItems.map((item) => {
                                // return <CartItemCard key={item.product} item={item} increaseQuantity={myFun} />
                                return (
                                    <div className="flex justify-between border-t border-broom py-6 last:border-b  last:border-broom" key={item.product}>
                                        <div className='flex'>
                                            <div className="aspect-w-1 min-w-[96px] md:min-w-[112px] overflow-hidden h-28 md:h-32 cursor-pointer bg-gray-100 shadow-sm border border-broom">
                                                <img
                                                    // src={item.color || item.image}
                                                    src={item.color ? `${backendUrl}${item.color}` : `${backendUrl}${item.image}`}
                                                    alt={item.name}
                                                    className="h-full w-full object-contain object-center"
                                                />
                                            </div>
                                            <div className='flex flex-col justify-between pl-3'>
                                                <div>
                                                    <NavLink to={`/product/${item.product}`} className='text-lg font-medium hover:underline'>{item.name}</NavLink>
                                                    {/* <h3 className='text-lg font-semibold'>{item.name}</h3> */}
                                                    {item.size && <p>Size: {item.size}</p>}
                                                </div>
                                                <h4 className='text-base font-semibold'>
                                                    <span><small>Rs.</small> {item.price}.00 * {item.quantity} = </span>
                                                    <span className=' text-orange-500'>{item.price * item.quantity}.00</span>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <div className='self-end'>
                                                <button className='border-none outline-0 bg-white flex justify-center items-center cursor-pointer p-[6px]' onClick={() => removeCartItem(item.product)}>
                                                    <CloseIcon style={{ fontSize: '18px' }} className=' text-red-500 font-normal' />
                                                </button>
                                            </div>
                                            <div className='flex gap-5'>
                                                <button className='border-none bg-gray-100 hover:bg-gray-200 p-1 outline-0 flex justify-center items-center cursor-pointer' onClick={() => increaseQuantity(item.product, item.quantity, item.stock, item.color, item.size)}>
                                                    <AddIcon className='text-xl' />
                                                </button>
                                                <button className='border-none bg-gray-100 hover:bg-gray-200 p-1 outline-0 flex justify-center items-center cursor-pointer' onClick={() => decreaseQuantity(item.product, item.quantity, item.color, item.size)}>
                                                    <RemoveIcon className='text-xl' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="bg-gray-50 col-span-12 lg:col-span-5 p-6 rounded-lg shadow-md flex flex-col gap-5 h-fit">
                            <h3 className='font-medium text-lg'>Cart Summary</h3>
                            <div className='flex justify-between border-b border-broom pb-3'>
                                <h4>Total Price :</h4>
                                <h3>{`Rs. ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</h3>
                            </div>
                            <button className='bg-broom text-black py-3 font-medium shadow-sm hover:shadow-lg' onClick={checkoutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}



export default Cart