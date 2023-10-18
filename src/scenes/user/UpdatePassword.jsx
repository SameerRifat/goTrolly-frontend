import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { clear_errors, updatePassword, update_password_reset } from '../../features/user/updateProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clear_errors, updatePassword, update_password_reset } from '../../features/user/userSlice';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { toast } from 'react-toastify';

const updatePasswordSchema = yup.object().shape({
    oldPassword: yup
        .string()
        .required("required"),
    newPassword: yup
        .string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required("required"),
    confirmPassword: yup
        .string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required("required"),
})

const UpdatePassword = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { updatePasswordLoading, isPasswordUpdated, updatePasswordError, isAuthenticated } = useSelector((state) => state.user)
    const updatePasswordSubmit = (values, actions) => {
        const myForm = new FormData();
        myForm.set("oldPassword", values.oldPassword)
        myForm.set("newPassword", values.newPassword)
        myForm.set("confirmPassword", values.confirmPassword)

        // console.log(Array.from(myForm))
        // for (let obj of myForm) {
        //     console.log(obj)
        // }
        dispatch(updatePassword(myForm))
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // useEffect(()=> {
    //     if(!isAuthenticated){
    //         navigate('/login');
    //     }
    // }, [isAuthenticated])
    useEffect(() => {
        if (updatePasswordError) {
            toast.error(updatePasswordError, {
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
        if (isPasswordUpdated) {
            // alert.success("Password Updated Successfully")
            toast.success('Password Updated Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/account')
            dispatch(update_password_reset())
        }
    }, [dispatch, updatePasswordError, isPasswordUpdated, navigate])

    return (
        <>
            <div className='h-full'>
                <div className='mt-1'>
                    <NavLink to='/' className='ml-3 md:ml-10 inline-block'>
                        <img
                            // src={logo}
                            src="/images/logo2.jpg"
                            alt="logo"
                            className='w-36 sm:w-40 md:w-48'
                        />
                    </NavLink>

                    <div className='mt-4 mb-10'>
                        <h1 className='uppercase text-xl sm:text-2xl md:text-3xl font-medium text-center'>Update Password</h1>
                        <div className="mt-12 sm:mx-auto px-4 sm:px-0 sm:w-full sm:max-w-lg">
                            <Formik
                                onSubmit={updatePasswordSubmit}
                                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                                validationSchema={updatePasswordSchema}
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
                                        <div className='my-5'>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                                                    Old Password
                                                </label>
                                            </div>
                                            <Box mt='4px'
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: '0px'
                                                    }
                                                }}
                                            >
                                                <OutlinedInput
                                                    fullWidth
                                                    size='small'
                                                    id="outlined-adornment-password"
                                                    type={showOldPassword ? 'text' : 'password'}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.oldPassword}
                                                    name='oldPassword'
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowOldPassword((show) => !show)}
                                                                edge="end"
                                                            >
                                                                {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    error={!!touched.oldPassword && !!errors.oldPassword}
                                                />
                                                <FormHelperText sx={{ color: '#D32F2F', ml: '12px' }}>
                                                    {touched.oldPassword && errors.oldPassword}
                                                </FormHelperText>
                                            </Box>
                                        </div>
                                        <div className='my-5'>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                                                    New Password
                                                </label>
                                            </div>
                                            <Box mt='4px'
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: '0px'
                                                    }
                                                }}
                                            >
                                                <OutlinedInput
                                                    fullWidth
                                                    size='small'
                                                    id="outlined-adornment-password"
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.newPassword}
                                                    name='newPassword'
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowNewPassword((show) => !show)}
                                                                edge="end"
                                                            >
                                                                {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    error={!!touched.newPassword && !!errors.newPassword}
                                                />
                                                <FormHelperText sx={{ color: '#D32F2F', ml: '12px' }}>
                                                    {touched.newPassword && errors.newPassword}
                                                </FormHelperText>
                                            </Box>
                                        </div>
                                        <div className='my-5'>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                                                    Confirm Password
                                                </label>
                                            </div>
                                            <Box mt='4px'
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: '0px'
                                                    }
                                                }}
                                            >
                                                <OutlinedInput
                                                    fullWidth
                                                    size='small'
                                                    id="outlined-adornment-password"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.confirmPassword}
                                                    name='confirmPassword'
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={() => setShowConfirmPassword((show) => !show)}
                                                                edge="end"
                                                            >
                                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                                                />
                                                <FormHelperText sx={{ color: '#D32F2F', ml: '12px' }}>
                                                    {touched.confirmPassword && errors.confirmPassword}
                                                </FormHelperText>
                                            </Box>
                                        </div>
                                        <div className='text-center'>
                                            {/* <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-gradient-to-tr from-pink-500 to-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Update
                                        </button> */}
                                            <LoadingButton loading={updatePasswordLoading} variant="contained"
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
                                                    px: '30px',
                                                    fontSize: '16px'
                                                }}
                                            >
                                                Update
                                            </LoadingButton>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePassword