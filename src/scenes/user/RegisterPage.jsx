import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import logo from '../../images/logo.png'
import { clear_errors, register } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


const userSchema = yup.object().shape({
  name: yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name should contain only alphabetic characters")
    .required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("required"),
})

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthenticated, error } = useSelector((state) => state.user)
  const handleFormSubmit = async (values, actions) => {
    const myForm = new FormData();
    myForm.set("name", values.name)
    myForm.set("email", values.email)
    myForm.set("password", values.password)
    // console.log("values: ", values)

    // const message = "Name: " + values.name + "\nEmail: " + values.email + "\nPassword: " + values.password;
    // alert(message);
    // console.log(Array.from(myForm))
    // for (let obj of myForm) {
    //     console.log(obj)
    // }
    dispatch(register(myForm))
  }
  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)
    }
    if (error && error !== 'Please login to access this resourse') {
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
      dispatch(clear_errors());
    }
  }, [isAuthenticated, error, dispatch, navigate])

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
          <h1 className='uppercase text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-bold md:font-extrabold text-center'>Register</h1>
          <div className="mt-12 sm:mx-auto px-3 sm:px-0 sm:w-full sm:max-w-lg">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{ name: '', email: '', password: '' }}
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
                  <div className='my-5'>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                        Password
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
                        type={showPassword ? 'text' : 'password'}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name='password'
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((show) => !show)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={!!touched.password && !!errors.password}
                      />
                      <FormHelperText sx={{ color: '#D32F2F', ml: '12px' }}>
                        {touched.password && errors.password}
                      </FormHelperText>
                    </Box>
                    {/* <div className="text-sm">
                      <NavLink to="/password/forgot" className="text-sm text-gray-400 uppercase">
                        Forgot password?
                      </NavLink>
                    </div> */}
                  </div>
                  <div className='text-center'>
                    {/* <button
                      type="submit"
                      className='uppercase px-6 py-1 bg-main text-xl font-medium'
                    >
                      Register
                    </button> */}
                    <LoadingButton loading={loading} variant="contained"
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
                      Register
                    </LoadingButton>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='text-center mt-1'>
              <NavLink to="/login" className="text-sm text-gray-400 uppercase">
                have an account? login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage