import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    FormLabel,
    Grid,
    IconButton,
    Typography,
    Tooltip,
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clear_update_discount_error, updateDiscount, update_discount_reset } from '../../features/product/productSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateDiscountDialog = ({ modal, toggle, selectedRowData }) => {
    const dispatch = useDispatch()
    const [discount, setDiscount] = useState(0)
    const [hasDiscount, setHasDicount] = React.useState(false);

    const handleChange = (event) => {
        if(event.target.checked === false){
            setHasDicount(event.target.checked);
            setDiscount(0)
        }else{
            setHasDicount(event.target.checked);
        }
    };

    const { updateDiscountLoading, isDiscountUpdated, updateDiscountError, getProductDetailsLoading, productDetails, getProductDetailsError } = useSelector((state) => state.product)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productIds = selectedRowData.map((product) => product.id)
        // console.log('product Ids: ', productIds)
        // console.log('Has Discount: ', hasDiscount)
        // console.log('discount: ', discount)
        dispatch(updateDiscount({ productIds, hasDiscount, discountPercentage: discount }))
    }
    const handleCancelClick = () => {
        setDiscount('');
        toggle();
    };
    useEffect(() => {
        setDiscount(selectedRowData.length === 1 ? selectedRowData[0].discountPercentage : 0)
        setHasDicount(selectedRowData.length === 1 ? selectedRowData[0].product.hasDiscount : false)
    }, [selectedRowData]);
    useEffect(() => {
        if (updateDiscountError) {
            toast.error(updateDiscountError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch((clear_update_discount_error))
        }
        if (isDiscountUpdated) {
            toggle()
            toast.success('Discount Updated Successfully!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(update_discount_reset())
            setDiscount('')
        }
    }, [dispatch, isDiscountUpdated, updateDiscountError]);
    return (
        <React.Fragment>
            <Modal
                open={modal}
                onClose={toggle}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400, maxWidth: '90vw' }}>
                    <Typography variant='h5'>Update Discount</Typography>
                    <Box mt={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid spacing={3} container>
                                <Grid item xs={12} display='flex' alignItems='center'>
                                    <Checkbox
                                        checked={hasDiscount}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <FormLabel>Add Discount</FormLabel>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormLabel>Discount %</FormLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        variant='outlined'
                                        autoComplete='off'
                                        placeholder='Discount'
                                        onChange={(e) => setDiscount(e.target.value)}
                                        value={discount}
                                        disabled={hasDiscount === false}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <LoadingButton loading={updateDiscountLoading} variant="contained"
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
                                            marginRight: '15px'
                                        }}
                                    >
                                        Update
                                    </LoadingButton>
                                    <Button variant="contained" color="error" onClick={handleCancelClick}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default UpdateDiscountDialog