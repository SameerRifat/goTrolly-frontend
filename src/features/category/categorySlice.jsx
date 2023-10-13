import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../components/APIs/Api';
const { http } = API();

const initialState = {
    createCategoryLoading: false,
    isCreated: false,
    createCategoryError: null,
    category: {},
    getCategoriesLoading: false,
    categories: [],
    getCategoriesError: null,
    deleteCategoryLoading: false,
    isCategoryDeleted: false,
    deleteCategoryError: null,
    updateCategoryLoading: false,
    isCategoryUpdated: false,
    updateCategoryError: null,
}
// login
// export const login = createAsyncThunk('category/login', async (data) => {
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

// createCategory
export const createCategory = createAsyncThunk('category/createCategory', async (formData) => {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.post("/api/v1/admin/category/new", formData, config)
        const response = await http.post("/api/v1/admin/category/new", formData, config)
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
// get all categories
export const getCategories = createAsyncThunk('category/getCategories', async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.get("/api/v1/categories")
        const response = await http.get("/api/v1/categories", config)
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

export const updateCategory = createAsyncThunk('category/updateCategory', async (data)=>{
    // const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true};
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.put(`/api/v1/admin/category/${data.id}`, data.formData, config)
        const response = await http.put(`/api/v1/admin/category/${data.id}`, data.formData, config)
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

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.delete(`/api/v1/admin/category/${id}`)
        const response = await http.delete(`/api/v1/admin/category/${id}`, config)
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


const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        clear_create_category_error: (state) => {
            state.createCategoryError = null
        },
        clear_get_categories_error: (state) => {
            state.getCategoriesError = null
        },
        clear_update_category_error: (state) => {
            state.updateCategoryError = null
        },
        clear_delete_category_error: (state) => {
            state.deleteCategoryError = null
        },
        create_category_reset: (state) => {
            state.isCreated = false
        },
        delete_category_reset: (state) => {
            state.isCategoryDeleted = false
        },
        update_category_reset: (state) => {
            state.isCategoryUpdated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, (state, action) => {
            state.createCategoryLoading = true
        })
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.createCategoryLoading = false
            state.isCreated = true;
            state.categories.push(action.payload.category);
        })
        builder.addCase(createCategory.rejected, (state, action) => {
            state.createCategoryLoading = false
            state.createCategoryError = action.error.message
        })
        builder.addCase(getCategories.pending, (state, action) => {
            state.getCategoriesLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.getCategoriesLoading = false
            state.categories = action.payload.categories
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.getCategoriesLoading = false
            state.getCategoriesError = action.error.message
        })
        // update category
        builder.addCase(updateCategory.pending, (state, action)=>{
            state.updateCategoryLoading = true
        })
        builder.addCase(updateCategory.fulfilled, (state, action)=>{
            state.updateCategoryLoading = false
            state.isCategoryUpdated = action.payload.success
            state.categories = state.categories.map((categ)=> {
                if(categ._id === action.payload.category._id){
                    return action.payload.category
                }else{
                    return categ
                }
            })
        })
        builder.addCase(updateCategory.rejected, (state, action)=>{
            state.updateCategoryLoading = false
            state.updateCategoryError = action.error.message
        })
        // delete category
        builder.addCase(deleteCategory.pending, (state, action) => {
            state.deleteCategoryLoading = true
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.deleteCategoryLoading = false
            state.isCategoryDeleted = action.payload.success
            const index = state.categories.findIndex((category) => category._id === action.payload.deletedCategoryId);

            // If the category is found, remove it from the state
            if (index !== -1) {
                state.categories.splice(index, 1);
            }
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.deleteCategoryLoading = false
            state.deleteCategoryError = action.error.message
        })
    }
})


export default categorySlice.reducer
export const { clear_create_category_error, clear_update_category_error, clear_get_categories_error, clear_delete_category_error, create_category_reset, delete_category_reset, update_category_reset } = categorySlice.actions