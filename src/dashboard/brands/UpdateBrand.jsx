import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import Dropzone from 'react-dropzone';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { clear_update_brand_error, createBrand, create_brand_reset, updateBrand, update_brand_reset } from '../../features/brand/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getCategories } from '../../features/category/categorySlice';

const UpdateBrand = ({ row, updateBrandOpen, handleUpdateBrandClose }) => {
    console.log('row: ', row)
    const dispatch = useDispatch()
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [open, setOpen] = React.useState(false);
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    // const [image, setImage] = useState(null)
    // const [newImage, setNewImage] = useState(null)
    const handleClickOpen = (row) => {
        setBrand(row.brandName)
        setCategory(row.categoryId)
        // setImage(row.image ? row.image.split('\\').pop().split('_').pop(): null)
        setOpen(true);
    };
    const handleClose = () => {
        // setOpen(false);
        setBrand('')
        setCategory('')
        handleUpdateBrandClose()
        // setImage(null)
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.set("brandName", brand)
        // if(newImage){
        //     formData.set("file", newImage);
        // }
        // for(let obj of formData){
        //     console.log(obj)
        // }
        const formData = {
            brandName: brand,
            categoryId: category
        };
        dispatch(updateBrand({ id: row.id, formData }))
    }
    const { updateBrandLoading, isBrandUpdated, updateBrandError } = useSelector((state) => state.brand)
    const { getCategoriesLoading, categories } = useSelector((state) => state.category)
    useEffect(() => {
        if (isBrandUpdated) {
            // toast.success('brand Updated Successfully', {
            //     position: "bottom-center",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
            setBrand('')
            // setImage(null)
            dispatch(update_brand_reset())
            setOpen(false)
        }
        if (updateBrandError) {
            toast.error(updateBrandError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(clear_update_brand_error())
        }
    }, [dispatch, isBrandUpdated, updateBrandError])
    useEffect(() => {
        if (row) {
            setBrand(row.brandName)
            setCategory(row.categoryId)
        }
    }, [row])
    return (
        <>
            {/* <IconButton onClick={() => handleClickOpen(row)}>
                <EditOutlinedIcon />
            </IconButton> */}
            <Dialog open={updateBrandOpen} onClose={handleClose}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle>Update brand</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <label htmlFor="email" className="block text-lg sm:text-xl uppercase font-medium leading-6 text-black">
                            brand
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
                                    {categories && categories.length > 0 && categories.map((category) => {
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
        </>
    )
}

export default UpdateBrand