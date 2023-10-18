import React, { useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clear_errors, createOrder } from '../../features/order/orderSlice';
import { remove_cart } from '../../features/cart/cartSlice';
import MetaData from '../../components/MetaData';
import API from '../../components/APIs/Api';
import { toast } from 'react-toastify';
const { http } = API();

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { loading, error } = useSelector((state) => state.order)
    const payBtn = useRef(null)
    const paymentData = {
        // amount: Math.round(orderInfo.totalPrice * 100)
        amount: Math.round(orderInfo.totalPrice)
    }
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        textPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        payBtn.current.opacity = 0.5;
        // const config = { headers: { 'Content-Type': 'application/json' } };
        const token = JSON.parse(localStorage.getItem('token'));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // withCredentials: true
        };
        try {
            const { data } = await http.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );
            const client_secret = data.client_secret;
            if (!stripe || !elements) return;
            console.log('client_secret: ', client_secret)
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.postal_code,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false;
                payBtn.current.opacity = 1;
                // alert.error(result.error.message)
                toast.error(result.error.message, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    dispatch(remove_cart())
                    navigate("/success")
                } else {
                    // alert.error("There's some issue while processing payment")
                    toast.error("There's some issue while processing payment", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            if (error.response) {
                // The server responded with a status code outside the range of 2xx
                const errorMessage = error.response.data.message;
                // alert.error(errorMessage);
                toast.error(errorMessage, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (error.request) {
                // The request was made but no response was received
                // alert.error('No response received from server');
                toast.error('No response received from server', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                // Something happened in setting up the request that triggered an Error
                // alert.error('Error occurred while sending the request');
                toast.error('Error occurred while sending the request', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }
    useEffect(() => {
        if (error) {
            // alert.error(error)
            toast.error(error, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_errors())
        }
    }, [dispatch, error, alert])

    return (
        <>
            <div className='pt-10 pb-10'>
                <MetaData title="Payment" />
                <div className="w-[94%] lg:w-[90%] mx-auto">
                    <CheckoutSteps activeStep={2} />
                    <div className="w-full sm:w-[400px] mx-auto">
                        <div className='text-center'>
                            <h2 className='text-xl sm:text-2xl font-medium border-b border-gray-400 pb-1 inline-block mb-5'>Card Info</h2>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className='mt-5 flex items-center'>
                                <CreditCardIcon style={{ position: 'absolute', transform: 'translateX(10px)', fontSize: '18px', color: 'rgba(0,0,0,0.6)' }} />
                                <CardNumberElement className='w-full border border-gray-500 rounded py-3 px-10' />
                            </div>
                            <div className='mt-5 flex items-center'>
                                <EventIcon style={{ position: 'absolute', transform: 'translateX(10px)', fontSize: '18px', color: 'rgba(0,0,0,0.6)' }} />
                                <CardExpiryElement className='w-full border border-gray-500 rounded py-3 px-10' />
                            </div>
                            <div className='mt-5 flex items-center'>
                                <VpnKeyIcon style={{ position: 'absolute', transform: 'translateX(10px)', fontSize: '18px', color: 'rgba(0,0,0,0.6)' }} />
                                <CardCvcElement className='w-full border border-gray-500 rounded py-3 px-10' />
                            </div>
                            <button type='submit' ref={payBtn}
                                className='font-medium bg-broom py-3 px-7 w-full mt-5 text-black hover:scale-100 hover:shadow-md shadow-sm cursor-pointer'
                            >
                                {loading ? <> <div class="custom-loader"></div> Creating... </> : `Pay - Rs. ${orderInfo && orderInfo.totalPrice}`}
                                {/* <div class="custom-loader"></div>Processing... */}
                            </button>
                            {/* <input type="submit" value={`Pay - Rs. ${orderInfo && orderInfo.totalPrice}`} className='mt-5 w-full bg-gradient-to-tr from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 rounded-md text-white py-3 font-semibold shadow-sm cursor-pointer disabled:opacity-[0.6]' ref={payBtn} /> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Payment