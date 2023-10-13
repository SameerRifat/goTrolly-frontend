import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    createProductTypeLoading: false,
    isCreated: false,
    createProductTypeError: null,
    productType: {},
    getProductTypesLoading: false,
    productTypes: [],
    getProductTypesError: null,
    deleteProductTypeLoading: false,
    isProductTypeDeleted: false,
    deleteProductTypeError: null,
    updateProductTypeLoading: false,
    isProductTypeUpdated: false,
    updateProductTypeError: null,
}
// login
// export const login = createAsyncThunk('productType/login', async (data) => {
//     console.log("login called")
//     const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
//     try {
//         const response = await axios.post("/api/v1/login", data, config);
//         return response.data;
//     } catch (error) {
//         if (error.response) {
//             // The server responded with a status code outside the range of 2xx
//             const errorMessage = error.response.data.message;
//             throw new Error(errorMessage);
//         } else if (error.request) {
//             // The request was made but no response was received
//             throw new Error('No response received from server');
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             throw new Error('Error occurred while sending the request');
//         }
//     }
// })

// createproductType
export const createProductType = createAsyncThunk('productType/createProductType', async (formData) => {
    // for(let obj of formData){
    //     console.log(obj)
    // }
    // const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const config = { withCredentials: true };
    try {
        const response = await axios.post("/api/v1/admin/productType/new", formData, config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})
// get all productTypes
export const getProductTypes = createAsyncThunk('productType/getProductTypes', async () => {
    try {
        const response = await axios.get("/api/v1/productTypes")
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

export const updateProductType = createAsyncThunk('productType/updateProductType', async ({id, formData})=>{
    // const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true};
    const config = { withCredentials: true };
    try {
        const response = await axios.put(`/api/v1/admin/productType/${id}`, formData, config)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})

export const deleteProductType = createAsyncThunk('productType/deleteProductType', async (id) => {
    try {
        const response = await axios.delete(`/api/v1/admin/productType/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            // The server responded with a status code outside the range of 2xx
            const errorMessage = error.response.data.message;
            throw new Error(errorMessage);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('No response received from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error occurred while sending the request');
        }
    }
})


const productTypeSlice = createSlice({
    name: 'productType',
    initialState,
    reducers: {
        clear_create_productType_error: (state) => {
            state.createProductTypeError = null
        },
        clear_get_productTypes_error: (state) => {
            state.getProductTypesError = null
        },
        clear_update_productType_error: (state) => {
            state.updateProductTypeError = null
        },
        clear_delete_productType_error: (state) => {
            state.deleteProductTypeError = null
        },
        create_productType_reset: (state) => {
            state.isCreated = false
        },
        delete_productType_reset: (state) => {
            state.isProductTypeDeleted = false
        },
        update_productType_reset: (state) => {
            state.isProductTypeUpdated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProductType.pending, (state, action) => {
            state.createProductTypeLoading = true
        })
        builder.addCase(createProductType.fulfilled, (state, action) => {
            state.createProductTypeLoading = false
            state.isCreated = true;
            state.productTypes.push(action.payload.productType);
        })
        builder.addCase(createProductType.rejected, (state, action) => {
            state.createProductTypeLoading = false
            state.createProductTypeError = action.error.message
        })
        builder.addCase(getProductTypes.pending, (state, action) => {
            state.getProductTypesLoading = true
        })
        builder.addCase(getProductTypes.fulfilled, (state, action) => {
            state.getProductTypesLoading = false
            state.productTypes = action.payload.productTypes
        })
        builder.addCase(getProductTypes.rejected, (state, action) => {
            state.getProductTypesLoading = false
            state.getProductTypesError = action.error.message
        })
        // update productType
        builder.addCase(updateProductType.pending, (state, action)=>{
            state.updateProductTypeLoading = true
        })
        builder.addCase(updateProductType.fulfilled, (state, action)=>{
            state.updateProductTypeLoading = false
            state.isProductTypeUpdated = action.payload.success
            state.productTypes = state.productTypes.map((categ)=> {
                if(categ._id === action.payload.productType._id){
                    return action.payload.productType
                }else{
                    return categ
                }
            })
        })
        builder.addCase(updateProductType.rejected, (state, action)=>{
            state.updateProductTypeLoading = false
            state.updateProductTypeError = action.error.message
        })
        // delete productType
        builder.addCase(deleteProductType.pending, (state, action) => {
            state.deleteProductTypeLoading = true
        })
        builder.addCase(deleteProductType.fulfilled, (state, action) => {
            state.deleteProductTypeLoading = false
            state.isProductTypeDeleted = action.payload.success
            const index = state.productTypes.findIndex((productType) => productType._id === action.payload.deletedProductTypeId);

            // If the productType is found, remove it from the state
            if (index !== -1) {
                state.productTypes.splice(index, 1);
            }
        })
        builder.addCase(deleteProductType.rejected, (state, action) => {
            state.deleteProductTypeLoading = false
            state.deleteProductTypeError = action.error.message
        })
    }
})


export default productTypeSlice.reducer
export const { clear_create_productType_error, clear_update_productType_error, clear_get_productTypes_error, clear_delete_productType_error, create_productType_reset, delete_productType_reset, update_productType_reset } = productTypeSlice.actions