import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import { Box, FormHelperText, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import logo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { clear_errors, login } from '../../features/user/userSlice';
import { toast } from 'react-toastify'
import MetaData from '../../components/MetaData';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


const userSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthenticated, error } = useSelector((state) => state.user)

  const handleFormSubmit = async (values, actions) => {
    const myForm = new FormData();
    myForm.set("email", values.email)
    myForm.set("password", values.password)
    // console.log("values: ", values)
    // const message = "Email: " + values.email + "\nPassword: " + values.password;
    // alert(message);
    dispatch(login(myForm))
    // navigate('/')
  }

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)
    }
    if (error && error !== 'Please login to access this resourse' && error !== "json web token is invalid, try again") {
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
      <MetaData title='GoTrolly - Login' />
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
          <h1 className='uppercase text-3xl sm:text-4xl md:text-5xl font-semibold sm:font-bold md:font-extrabold text-center'>Login</h1>
          <div className="mt-12 sm:mx-auto px-4 sm:px-0 sm:w-full sm:max-w-lg">
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={{ email: '', password: '' }}
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
                  <Box>
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
                        className='border-4 border-red-500'
                      />
                    </Box>
                  </Box>
                  <div className='my-6'>
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
                    <div className="text-sm">
                      <NavLink to="#" className="text-sm text-gray-400 uppercase">
                        Forgot password?
                      </NavLink>
                    </div>
                  </div>
                  <div className='text-center'>
                    {/* <button
                      type="submit"
                      className='uppercase px-6 py-1 bg-main text-xl font-medium'
                    >
                      Sign in
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
                      Sign in
                    </LoadingButton>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='text-center mt-1'>
              <NavLink to="/register" className="text-sm text-gray-400 uppercase">
                Create account
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage