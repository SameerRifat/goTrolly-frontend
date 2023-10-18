import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import logo from '../../images/logo.png'
import { clear_errors, loadUser, register, updateProfile, update_profile_reset } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


const userSchema = yup.object().shape({
    name: yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Name should contain only alphabetic characters")
        .required("required"),
    email: yup.string().email("Invalid email").required("required")
})

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { loading: userLoading, user, error: userError, isProfileUpdated, updateProfileLoading, updateProfileError, isAuthenticated } = useSelector((state) => state.user)
    const handleFormSubmit = async (values, actions) => {
        const myForm = new FormData();
        myForm.set("name", values.name)
        myForm.set("email", values.email)
        // console.log("values: ", values)

        // const message = "Name: " + values.name + "\nEmail: " + values.email + "\nPassword: " + values.password;
        // alert(message);
        // console.log(Array.from(myForm))
        // for (let obj of myForm) {
        //     console.log(obj)
        // }
        dispatch(updateProfile((myForm)))
    }
    // useEffect(() => {
    //     if (user) {
    //         setAvatarPreview(user?.avatar?.url)
    //     }
    // }, [user])
    // useEffect(()=> {
    //     if(!isAuthenticated){
    //         navigate('/login');
    //     }
    // }, [isAuthenticated])
    useEffect(() => {
        if (isProfileUpdated) {
            // alert.success("Profile Updated Successfully")
            toast.success('Profile Updated Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(loadUser())
            navigate('/account')
            dispatch(update_profile_reset())
        }
        if (updateProfileError) {
            // alert.success("Profile Updated Successfully")
            toast.error(updateProfileError, {
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
    }, [dispatch, isProfileUpdated, navigate, updateProfileError])

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
                </div>
                <div className='mt-4 mb-10'>
                    <h1 className='uppercase text-xl sm:text-2xl md:text-3xl font-medium text-center'>Update Profile</h1>
                    <div className="mt-12 sm:mx-auto px-3 sm:px-0 sm:w-full sm:max-w-lg">
                        <Formik
                            onSubmit={handleFormSubmit}
                            // initialValues={{ name: '', email: '', password: '' }}
                            initialValues={{
                                name: user ? user.name : '',
                                email: user ? user.email : ''
                            }}
                            validationSchema={userSchema}
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
                                <Form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                                            Name
                                        </label>
                                        <Box mt='4px'
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: '0px'
                                                }
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                size='small'
                                                variant='outlined'
                                                type='text'
                                                autoComplete='off'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name='name'
                                                error={!!touched.name && !!errors.name}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Box>
                                    </div>
                                    <div className='mt-5'>
                                        <label htmlFor="email" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                                            Email
                                        </label>
                                        <Box mt='4px'
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: '0px'
                                                }
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                size='small'
                                                variant='outlined'
                                                type='email'
                                                autoComplete='off'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name='email'
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                            />
                                        </Box>
                                    </div>

                                    <div className='text-center mt-6'>
                                        {/* <button
                                            type="submit"
                                            className='uppercase px-6 py-1 bg-main text-xl font-medium shadow-sm hover:shadow-md'
                                        >
                                            Update
                                        </button> */}
                                        <LoadingButton loading={updateProfileLoading} variant="contained"
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
        </>
    )
}

export default UpdateProfile