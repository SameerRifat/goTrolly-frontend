import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { clear_create_brand_error, createBrand, create_brand_reset } from '../../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../features/category/categorySlice';
import Loader from '../../components/Loader';

const CreateBrand = () => {
    const dispatch = useDispatch()
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setBrand('')
        setCategory('')
    };
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    // const [image, setImage] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.set("brandName", brand)
        // formData.set("categoryId", category);'
        const formData = {
            brandName: brand,
            categoryId: category
        };
        dispatch(createBrand(formData))
    }
    const { createBrandLoading, isCreated, createBrandError } = useSelector((state) => state.brand)
    const { getCategoriesLoading, categories } = useSelector((state) => state.category)
    useEffect(() => {
        if (isCreated) {
            toast.success('Brand Created Successfully', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setBrand('')
            // setImage(null)
            dispatch(create_brand_reset())
            setOpen(false)
            setCategory('')
        }
        if (createBrandError) {
            toast.error(createBrandError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_create_brand_error())
        }
    }, [dispatch, isCreated, createBrandError])
    useEffect(() => {
        dispatch(getCategories())
    }, [])
    return (
        <>
            <button
                className='border-2 md:border-[3px] border-broom py-1 px-2 sm:px-4 text-broom text-base sm:text-lg font-medium'
                onClick={handleClickOpen}
            >
                create new
            </button>
            {getCategoriesLoading ? <Loader /> : (
                <Dialog open={open} onClose={handleClose}
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                >
                    <DialogTitle>create new Brand</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                                Brand
                            </label>
                            <Box mt='3px'
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
                                    autoComplete='off'
                                    value={brand}
                                    placeholder='Brand Name'
                                    className='border-4 border-red-500'
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Box>
                            <Box mt='20px'
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: '0px'
                                    }
                                }}
                            >
                                <label htmlFor="email" className="block text-lg uppercase font-medium leading-6 text-black">
                                    Category
                                </label>
                                <FormControl fullWidth>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        // label="Age"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {categories && categories.length > 0 && categories.map((category)=> {
                                            return (
                                                <MenuItem value={category._id}>{category.category}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                            {/* <DialogActions sx={{ justifyContent: 'flex-start', px: '24px', mb: '10px' }}> */}
                            <div className='mt-5 flex items-center gap-3'>
                                <Button
                                    type='submit'
                                    sx={{
                                        backgroundColor: '#EAD820',
                                        color: 'black',
                                        ':hover': {
                                            bgcolor: '#ead920a6'
                                        }
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button onClick={handleClose}
                                    sx={{
                                        color: 'black',
                                        ":hover": {
                                            background: '#ebdf60',
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                            {/* </DialogActions> */}
                        </form>
                        {/* )} */}

                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}

export default CreateBrand