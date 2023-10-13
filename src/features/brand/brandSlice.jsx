import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../components/APIs/Api';
const { http } = API();

const initialState = {
    createBrandLoading: false,
    isCreated: false,
    createBrandError: null,
    brand: {},
    getBrandsLoading: false,
    brands: [],
    getBrandsError: null,
    deleteBrandLoading: false,
    isBrandDeleted: false,
    deleteBrandError: null,
    updateBrandLoading: false,
    isBrandUpdated: false,
    updateBrandError: null,
}
// login
// export const login = createAsyncThunk('brand/login', async (data) => {
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

// createbrand
export const createBrand = createAsyncThunk('brand/createBrand', async (formData) => {
    // for(let obj of formData){
    //     console.log(obj)
    // }
    // const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    // const config = { withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.post("/api/v1/admin/brand/new", formData, config)
        const response = await http.post("/api/v1/admin/brand/new", formData, config)
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
// get all brands
export const getBrands = createAsyncThunk('brand/getBrands', async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.get("/api/v1/brands")
        const response = await http.get("/api/v1/brands", config)
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

export const updateBrand = createAsyncThunk('brand/updateBrand', async ({id, formData})=>{
    // const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true};
    // const config = { withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.put(`/api/v1/admin/brand/${id}`, formData, config)
        const response = await http.put(`/api/v1/admin/brand/${id}`, formData, config)
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

export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.delete(`/api/v1/admin/brand/${id}`)
        const response = await http.delete(`/api/v1/admin/brand/${id}`, config)
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


const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        clear_create_brand_error: (state) => {
            state.createBrandError = null
        },
        clear_get_brands_error: (state) => {
            state.getBrandsError = null
        },
        clear_update_brand_error: (state) => {
            state.updateCategoryError = null
        },
        clear_delete_brand_error: (state) => {
            state.deleteCategoryError = null
        },
        create_brand_reset: (state) => {
            state.isCreated = false
        },
        delete_brand_reset: (state) => {
            state.isBrandDeleted = false
        },
        update_brand_reset: (state) => {
            state.isBrandUpdated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBrand.pending, (state, action) => {
            state.createBrandLoading = true
        })
        builder.addCase(createBrand.fulfilled, (state, action) => {
            state.createBrandLoading = false
            state.isCreated = true;
            state.brands.push(action.payload.brand);
        })
        builder.addCase(createBrand.rejected, (state, action) => {
            state.createBrandLoading = false
            state.createBrandError = action.error.message
        })
        builder.addCase(getBrands.pending, (state, action) => {
            state.getBrandsLoading = true
        })
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.getBrandsLoading = false
            state.brands = action.payload.brands
        })
        builder.addCase(getBrands.rejected, (state, action) => {
            state.getBrandsLoading = false
            state.getBrandsError = action.error.message
        })
        // update brand
        builder.addCase(updateBrand.pending, (state, action)=>{
            state.updateBrandLoading = true
        })
        builder.addCase(updateBrand.fulfilled, (state, action)=>{
            state.updateBrandLoading = false
            state.isBrandUpdated = action.payload.success
            state.brands = state.brands.map((categ)=> {
                if(categ._id === action.payload.brand._id){
                    return action.payload.brand
                }else{
                    return categ
                }
            })
        })
        builder.addCase(updateBrand.rejected, (state, action)=>{
            state.updateBrandLoading = false
            state.updateBrandError = action.error.message
        })
        // delete brand
        builder.addCase(deleteBrand.pending, (state, action) => {
            state.deleteBrandLoading = true
        })
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            state.deleteBrandLoading = false
            state.isBrandDeleted = action.payload.success
            const index = state.brands.findIndex((brand) => brand._id === action.payload.deletedBrandId);

            // If the brand is found, remove it from the state
            if (index !== -1) {
                state.brands.splice(index, 1);
            }
        })
        builder.addCase(deleteBrand.rejected, (state, action) => {
            state.deleteBrandLoading = false
            state.deleteBrandError = action.error.message
        })
    }
})


export default brandSlice.reducer
export const { clear_create_brand_error, clear_update_brand_error, clear_get_brands_error, clear_delete_brand_error, create_brand_reset, delete_brand_reset, update_brand_reset } = brandSlice.actions