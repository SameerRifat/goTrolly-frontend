import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { clear_errors, getOrderDetails } from "../../features/order/orderDetailsSlice";
// import { newReview, clear_errors as reviewClearErrors, review_reset } from '../../features/product/reviewSlice'
// import Loader from "../Loader";
// import MetaData from "../MetaData";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import { toast } from "react-toastify";
import { newReview, review_reset, clear_errors as reviewClearErrors } from "../../features/review/reviewSlice";
// import { getOrderDetails } from "../../features/order/orderSlice";
import MetaData from "../../components/MetaData";
import Loader from "../../components/Loader";
import { clear_errors, getOrderDetails } from "../../features/order/orderSlice";
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const alert = useAlert();
    const { orderDetails, getOrderDetailsLoading, getOrderDetailsError } = useSelector((state) => state.order);
    const { success, error: reviewError } = useSelector(state => state.review)
    // const address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
    console.log('orderDetails: ', orderDetails)
    // Review Dialog
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [productId, setProductId] = useState("")
    const handleClickOpen = (product) => {
        setProductId(product)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", productId);
        dispatch(newReview(myForm));
        setOpen(false);
    }
    useEffect(() => {
        dispatch(getOrderDetails(id));
    }, [id])
    useEffect(() => {
        if (getOrderDetailsError) {
            toast.error(getOrderDetailsError, {
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
        if (reviewError) {
            setProductId('')
            // alert.error(reviewError);
            toast.error(reviewError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(reviewClearErrors())
        }
        if (success) {
            setProductId('')
            setComment('')
            setRating(0)
            toast.success("Review Submitted Successfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(review_reset())
        }
        // dispatch(getOrderDetails(id));
    }, [dispatch, alert, reviewError, success, getOrderDetailsError]);

    return (
        <>
            <MetaData title="Order Details" />
            {getOrderDetailsLoading ? (
                <Loader />
            ) : (
            <div className="pt-10">
                <div className="w-[95%] md:w-[94%] lg:w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-10 pb-12 border border-broom p-5 shadow-md mb-10 rounded-md">
                    {orderDetails && Object.keys(orderDetails).length > 0 ? (
                        <>
                            <div className="col-span-full lg:col-span-1">
                                <div className='flex gap-3'>
                                    <p className="text-sm">Date: {orderDetails.createdAt.slice(0, 10)}</p>
                                    <p className="text-sm">Time: {orderDetails.createdAt.slice(11, 16)}</p>
                                </div>
                                <h2 className="text-lg sm:text-xl font-medium mb-2">Order #{orderDetails && orderDetails._id}</h2>
                                <div className="">
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block text-lg sm:text-xl font-medium'>Shipping Info</h3>
                                    <div className='pl-3 pt-3 flex flex-col gap-1.5'>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Name:</p>
                                            <span className='text-base'>{orderDetails.user.name}</span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Phone:</p>
                                            <span className='text-base'>{orderDetails.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div className='flex sm:items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Address:</p>
                                            <span className='text-base'>{`${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>Payment</h3>
                                    <div className='pl-3 pt-3 flex flex-col gap-1.5'>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Payment Status:</p>
                                            <span className={`${orderDetails.paymentInfo.status === "succeeded" ? 'text-green-500' : 'text-red-500'}`}>
                                                {orderDetails.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Amount:</p>
                                            <span className='text-base'>{orderDetails.totalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>order Status</h3>
                                    <span className={`${orderDetails.orderStatus === "Delivered" ? 'text-green-dark' : 'text-blue-dark'} pl-3 pt-3 block`}>
                                        {orderDetails.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="col-span-full lg:col-span-1 bg-gray-50 rounded-md shadow-md py-10 px-2 md:p-10 h-fit">
                                <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>Order Items</h3>
                                <div className='mt-3 flex flex-col pt-4'>
                                    {orderDetails && orderDetails.orderItems.map((item) => {
                                        return <div className="relative flex justify-between gap-3 items-center border-t border-gray-200 py-6 last:border-b  last:border-gray-200 bg-white px-2 md:px-3 rounded-lg" key={item.product}>
                                            <div className='flex gap-2 md:gap-3'>
                                                <div className="aspect-w-1 min-w-[96px] md:min-w-[112px] overflow-hidden rounded-sm h-28 md:h-32 cursor-pointer bg-gray-100">
                                                    <img
                                                        // src={item.color || item.image}
                                                        // src={`${backendUrl}${item.color}` || `${backendUrl}${item.image}`}
                                                        src={`${backendUrl}${item.image}`}
                                                        alt='product colors preview'
                                                        className="h-full w-full object-contain object-center"
                                                    />
                                                </div>
                                                <div>
                                                    <NavLink to={`/product/${item.product}`} className='text-base md:text-lg font-medium'>{item.name}</NavLink>
                                                    {item.size && <p className="text-sm md:text-base">Size: {item.size}</p>}
                                                    <p className="text-sm md:text-base mt-1">
                                                        {item.price} * {item.quantity} = {item.price * item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            {
                                                orderDetails && orderDetails.orderStatus === 'Delivered' &&
                                                <button className='absolute right-3 bottom-3 bg-gradient-to-tr from-pink-500 to-violet-500 text-white text-xs sm:text-sm px-2 py-2 rounded-md font-semibold mt-1 ' onClick={() => handleClickOpen(item.product)}>Submit Review</button>
                                            }
                                        </div>
                                    })}
                                </div>
                                <Dialog open={open} onClose={handleClose}>
                                    {/* <DialogTitle>Submit Review</DialogTitle> */}
                                    <DialogTitle className='flex justify-between items-center p-3 bg-gray-100'>
                                        <p className='font-semibold text-base text-gray-500'>Submit Review</p>
                                        <button onClick={handleClose}>
                                            <CloseIcon />
                                        </button>
                                    </DialogTitle>
                                    <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                        <Rating
                                            name="simple-controlled"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            size="large"
                                        />
                                        <textarea
                                            style={{ padding: '5px' }}
                                            cols="40"
                                            rows="8"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >
                                        </textarea>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color='secondary' onClick={handleClose}>Cancel</Button>
                                        <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                                    </DialogActions>
                                </Dialog>
                                <div className="text-end mt-5 px-4">
                                    <h3 className='font-semibold'>Total Price: <span className="text-orange-500 ml-2">Rs. {orderDetails.totalPrice}</span></h3>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No order exist with this id</p>
                    )}
                </div>
            </div>
            )}
        </>
    );
};


export default OrderDetails;
