import React, { useEffect } from 'react'
// import MetaData from '../../MetaData'
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Form, Formik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
// import { getOrderDetails, clear_errors } from '../../../features/order/orderDetailsSlice'
// import { updateOrder, update_order_reset, clear_errors as updateOrderClearErrors } from '../../../features/order/updateOrderSlice'
import { NavLink, useParams } from 'react-router-dom';
// import Loader from '../../Loader'
// import { tokens } from '../../../theme';
import { toast } from 'react-toastify';
import MetaData from '../../components/MetaData';
import Loader from '../../components/Loader';
import { getOrderDetails, updateOrder, update_order_reset } from '../../features/order/orderSlice';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
const backendUrl = import.meta.env.VITE_REACT_APP_API_URL;


const initialValues = {
    status: ''
}
const orderSchema = yup.object().shape({
    status: yup.string().oneOf(["Shipped", "Delivered"], "Invalid Status").required("required")
})

const ProcessOrder = () => {
    const isNonMobileScreens = useMediaQuery('(min-width:700px)');
    const dispatch = useDispatch()
    const { id } = useParams()
    const { getOrderDetailsLoading, orderDetails: order, getOrderDetailsError } = useSelector((state) => state.order)
    const { updateOrderLoading, updateOrderError, isOrderUpdated, } = useSelector((state) => state.order);
    const handleFormSubmit = async (values, actions) => {
        const myForm = new FormData();
        myForm.set("status", values.status)
        const data = {
            id,
            myForm,
        };
        dispatch(updateOrder(data))
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
    }
    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [id])
    useEffect(() => {
        if (getOrderDetailsError) {
            // alert.error(getOrderDetailsError);
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
            dispatch(clear_errors());
        }
        if (updateOrderError) {
            // alert.error(updateOrderError);
            toast.error(updateOrderError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(updateOrderClearErrors());
        }
        if (isOrderUpdated) {
            // alert.success("Status updated Successfully");
            toast.success("Status updated Successfully", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(update_order_reset());
        }
        // dispatch(getOrderDetails(id))
    }, [dispatch, getOrderDetailsError, updateOrderError, isOrderUpdated])
    return (
        <>
            <MetaData title="Process Order - Admin" />
            <Box ml={isNonMobileScreens ? '20px' : '0px'} color='white'>
                {/* <AdminHeader title="Update Order Status" subtitle="See Order Details and update status" /> */}
                <h2 className='mb-4 font-medium text-2xl text-white'>Update Order Status</h2>
                {getOrderDetailsLoading ? <Loader /> :
                    order && (
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <div className='flex gap-3'>
                                    <p className="text-sm">Date: {order.createdAt.slice(0, 10)}</p>
                                    <p className="text-sm">Time: {order.createdAt.slice(11, 16)}</p>
                                </div>
                                <h2 className="text-lg sm:text-xl font-medium mb-2">Order #{order && order._id}</h2>
                                <Box mb='15px' sx={{ '& > div': { marginLeft: '10px' } }}>
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block text-lg sm:text-xl font-medium'>Shipping Info</h3>
                                    <div className='flex items-center gap-1.5'>
                                        <p className='text-lg font-medium'>Name:</p>
                                        <span className='text-base'>{order.user.name}</span>
                                    </div>
                                    <div className='flex items-center gap-1.5'>
                                        <p className='text-lg font-medium'>Phone:</p>
                                        <span className='text-base'>{order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div className='flex items-center gap-1.5'>
                                        <p className='text-lg font-medium'>Address:</p>
                                        <span className='text-base'>{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                    </div>
                                </Box>
                                <div className="mt-4">
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>Payment</h3>
                                    <div className='pl-3 pt-3 flex flex-col gap-1.5'>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Payment Status:</p>
                                            <span className={`${order.paymentInfo.status === "succeeded" ? 'text-green-500' : 'text-red-500'}`}>
                                                {order.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-1.5'>
                                            <p className='text-lg font-medium'>Amount:</p>
                                            <span className='text-base'>{order.totalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>orderDetails Status</h3>
                                    <span className={`${order.orderStatus === "Delivered" ? 'text-green-500' : 'text-red-500'} pl-3 pt-3 block`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                                {/* <Box mb='15px' sx={{ '& > div': { marginLeft: '10px' } }}>
                                    <Typography variant='h3' marginBottom='5px'>Order Status</Typography>
                                    <Box display='flex' gap='8px'>
                                        <Typography fontWeight='bold'>Payment Status:</Typography>
                                        <Typography fontWeight='bold' color={order.orderStatus === "Delivered" ? '#70ef2d' : '#D6221D'}>
                                            {order.orderStatus}
                                        </Typography>
                                    </Box>
                                </Box> */}
                                <Box mb='15px' sx={{ '& > div': { marginLeft: '10px' } }}>
                                    <h3 className='text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>Order Items</h3>
                                    <div className='mt-3 flex flex-col pt-4'>
                                        {order.orderItems.map((item) => {
                                            return <div className="flex justify-between items-center border-t border-gray-200 py-6 last:border-b  last:border-gray-200 px-4" key={item.product}>
                                                <div className='flex gap-3 items-center'>
                                                    <div className="aspect-w-1 min-w-[96px] md:min-w-[112px] overflow-hidden rounded-sm h-28 md:h-32 cursor-pointer bg-gray-200">
                                                        <img
                                                            // src={item.color || item.image}
                                                            src={`${backendUrl}${item.image}`}
                                                            alt='product colors preview'
                                                            className="h-full w-full object-contain object-center"
                                                        />
                                                    </div>
                                                    <div>
                                                        <NavLink to={`/product/${item.product}`} className='text-lg font-semibold'>{item.name}</NavLink>
                                                        {item.size && <p>Size: {item.size}</p>}
                                                    </div>
                                                </div>
                                                <p>
                                                    ${item.price} * {item.quantity} = ${item.price * item.quantity}
                                                </p>
                                            </div>
                                        })}
                                    </div>
                                    {/* <Box display='flex' flexDirection='column' gap='15px'>
                                        {order.orderItems.map((item) => {
                                            return (
                                                <Box key={item.product} display='flex' justifyContent='space-between' padding='10px 20px 10px 10px' alignItems='center' boxShadow={`0 0 5px -1px ${colors.grey[100]}`} borderRadius='5px'>
                                                    <Box display='flex' gap='20px' alignItems='center' sx={{ '& a': { color: `${colors.grey[100]} !important` } }}>
                                                        <Box width='110px' height='110px'>
                                                            <img src={item.image} alt="image" />
                                                        </Box>
                                                        <NavLink color='white' to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </NavLink>
                                                    </Box>
                                                    <Typography>
                                                        <span>
                                                            ${item.price} * {item.quantity} ={" "}
                                                        </span>
                                                        <span>${item.price * item.quantity}</span>
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box> */}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <h3 className='mb-5 text-center pb-1 border-b border-gray-300 inline-block font-medium text-lg sm:text-xl'>Process Order</h3>
                                <Formik
                                    onSubmit={handleFormSubmit}
                                    initialValues={initialValues}
                                    validationSchema={orderSchema}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                                            <FormControl variant="outlined" disabled={order.orderStatus === 'Delivered'} fullWidth={true} error={!!touched.status && !!errors.status}
                                                sx={{
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: 'white',
                                                        color: 'white'
                                                    },
                                                    '& .MuiInputBase-root.Mui-disabled': {
                                                        border: '1px solid white',
                                                        borderColor: 'white',
                                                        color: 'white'
                                                    },
                                                    '& .MuiInputLabel-root.Mui-disabled': {
                                                        borderColor: 'white',
                                                        color: 'white'
                                                    },
                                                    '& .MuiOutlinedInput-notchedOutline:hover': {
                                                        borderColor: 'white'
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: 'white'
                                                    },
                                                }}
                                            >
                                                <InputLabel id="status" sx={{ color: 'white' }}>Status</InputLabel>
                                                <Select
                                                    labelId="status"
                                                    id="demo-simple-select-standard"
                                                    name='status'
                                                    value={values.status}
                                                    onChange={handleChange}
                                                    label="Status"
                                                    sx={{
                                                        borderColor: 'white',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Order Status</em>
                                                    </MenuItem>
                                                    {order.orderStatus === 'Processing' && <MenuItem value='Shipped'>Shipped</MenuItem>}
                                                    {order.orderStatus === 'Shipped' && <MenuItem value='Delivered'>Delivered</MenuItem>}
                                                </Select>
                                                <FormHelperText>{touched.status && errors.status}</FormHelperText>
                                            </FormControl>
                                            {/* <button type='submit' disabled={updateOrderLoading || order.orderStatus === 'Delivered'}
                                                className='mt-5 w-full h-11 flex justify-center items-center rounded-md bg-gradient-to-tr from-pink-500 to-violet-500  hover:from-pink-600 hover:to-violet-600 cursor-pointer px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-60'
                                            >
                                                Update Status
                                            </button> */}
                                            <LoadingButton loading={updateOrderLoading} variant="contained"
                                                type='submit'
                                                sx={{
                                                    backgroundColor: '#EAD820',
                                                    color: 'black',
                                                    ':hover': {
                                                        bgcolor: '#ead920a6'
                                                    },
                                                    ":disabled": {
                                                        bgcolor: '#ead920ed',
                                                    },
                                                    mt: '10px',
                                                    fontSize: '16px'
                                                }}
                                                fullWidth
                                            >
                                                Update Status
                                            </LoadingButton>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    )
                }
            </Box>
        </>
    )
}

export default ProcessOrder

// < FormControl disabled variant = "standard" >
    //     <InputLabel htmlFor="component-disabled">Name</InputLabel>
    //     <Input id="component-disabled" defaultValue="Composed TextField" />
    // <FormHelperText>Disabled</FormHelperText>