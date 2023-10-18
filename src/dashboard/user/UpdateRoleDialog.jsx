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
    FormControl,
    InputLabel,
    Select,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clear_errors, updateUsersRole, update_role_reset } from '../../features/user/userSlice';
// import { clear_update_discount_error, updateDiscount, update_discount_reset } from '../../features/product/productSlice';

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

const UpdateRoleDialog = ({ modal, toggle, selectedRowData }) => {
    const dispatch = useDispatch()
    const [userRole, setUserRole] = useState(0)

    const { updateUsersRoleLoading, isRoleUpdated, updateUsersRoleError } = useSelector((state) => state.user)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userIds = selectedRowData.map((user) => user.id)
        // console.log('product Ids: ', productIds)
        // console.log('Has Discount: ', hasDiscount)
        // console.log('discount: ', discount)
        dispatch(updateUsersRole({ userIds, userRole }))
    }
    const handleCancelClick = () => {
        setUserRole('');
        toggle();
    };
    useEffect(() => {
        setUserRole(selectedRowData.length === 1 ? selectedRowData[0].role : '')
    }, [selectedRowData]);
    useEffect(() => {
        if (updateUsersRoleError) {
            toast.error(updateUsersRoleError, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch((clear_errors))
        }
        if (isRoleUpdated) {
            toggle()
            toast.success('Role Updated Successfully!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(update_role_reset())
            setUserRole('')
        }
    }, [dispatch, isRoleUpdated, updateUsersRoleError]);
    return (
        <React.Fragment>
            <Modal
                open={modal}
                onClose={toggle}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400, maxWidth: '90vw' }}>
                    <Typography variant='h5'>Update Users Role</Typography>
                    <Box mt={3}>
                        <form onSubmit={handleSubmit}>
                            <Grid spacing={3} container>
                                <Grid item xs={12}>
                                    <label htmlFor="email" className='text-lg mb-2'>
                                        Role
                                    </label>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth={true}
                                    >
                                        <Select
                                            // labelId="demo-simple-select-standard-label"
                                            // id="demo-simple-select-standard"
                                            name="role"
                                            value={userRole}
                                            onChange={(e) => setUserRole(e.target.value)}
                                        // label="Role"
                                        >
                                            <MenuItem value="">
                                                <em>Select a Role</em>
                                            </MenuItem>
                                            <MenuItem value='admin'>Admin</MenuItem>
                                            <MenuItem value='user'>User</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} lg={12}>
                                    <LoadingButton loading={updateUsersRoleLoading} variant="contained"
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

export default UpdateRoleDialog