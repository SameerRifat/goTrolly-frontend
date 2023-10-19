import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../components/APIs/Api';
const { http } = API();


const initialState = {
    createProductLoading: false,
    isCreated: false,
    createProductError: null,
    getProductsLoading: false,
    fetProductsLoading: false,
    products: [],
    fetchProductError: '',
    getProductsError: null,
    getProductDetailsLoading: false,
    productDetails: {},
    relatedProducts: [],
    getProductDetailsError: null,
    getAdminProductsLoading: false,
    adminProducts: [],
    getAdminProductsError: null,
    deleteProductLoading: false,
    isProductDeleted: false,
    deleteProductError: null,
    updateProductLoading: false,
    isProductUpdated: false,
    updateProductError: null,
    updateDiscountLoading: false,
    isDiscountUpdated: false,
    updateDiscountError: null,
}

// createproduct
export const createProduct = createAsyncThunk('product/createProduct', async (formData) => {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.post("/api/v1/admin/product/new", formData, config)
        const response = await http.post("/api/v1/admin/product/new", formData, config)
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
export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({ keyword = '', currentPage = 1, price = [0, 25000], category, productType = '', brand = '', ratings = 0, order = '' }) => {
    // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&order=${order}`;
    // if(category){
    //     // link = `/api/v1/products?keyword=${keyword}&page=2&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&order=${order}`;
    // }
    // if(productType){
    //     // link = `/api/v1/products?keyword=${keyword}&page=2&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&order=${order}&productType=${productType}`;
    // }
    const link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&order=${order}${category ? `&category=${category}` : ''}${productType ? `&productType=${productType}` : ''}${brand ? `&brand=${brand}` : ''}`;
    // console.log(category)
    // const response = await axios.get(link);
    const response = await http.get(link);
    return response.data;
})
// get all Products
export const getAdminProducts = createAsyncThunk('product/getAdminProducts', async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        const response = await http.get("/api/v1/admin/products", config)
        // const response = await http.get("/api/v1/admin/products")
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
export const getProductDetails = createAsyncThunk('product/getProductDetails', async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.get(`/api/v1/product/${id}`)
        const response = await http.get(`/api/v1/product/${id}`, config)
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

export const updateProduct = createAsyncThunk('product/updateProduct', async (data) => {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.put(`/api/v1/admin/product/${data.id}`, data.formData, config)
        const response = await http.put(`/api/v1/admin/product/${data.id}`, data.formData, config)
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
export const updateDiscount = createAsyncThunk('product/updateDiscount', async (data) => {
    // const config = { withCredentials: true };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    try {
        // const response = await axios.put(`/api/v1/admin/products/updateDiscount`, data, config)
        const response = await http.put(`/api/v1/admin/products/updateDiscount`, data, config)
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

export const deleteProducts = createAsyncThunk('product/deleteProducts', async (productIds, thunkAPI) => {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
    };
    
    try {
      const dataToSend = JSON.stringify({ productIds });
  
      const response = await http.delete(`/api/v1/admin/products/delete`, {
        ...config,
        data: dataToSend, // Send the data in the 'data' field of the config.
      });
  
      return response.data;
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
  });
  

// export const deleteProducts = createAsyncThunk('product/deleteProducts', async (products) => {
//     const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
//     console.log('products: ', products);
//     try {
//         const response = await axios.delete(`/api/v1/admin/products/delete`, products, config)
//         return response.data
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


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clear_create_product_error: (state) => {
            state.createProductError = null
        },
        clear_get_products_error: (state) => {
            state.getProductsError = null
        },
        clear_get_admin_products_error: (state) => {
            state.getAdminProductsError = null
        },
        clear_update_product_error: (state) => {
            state.updateProductError = null
        },
        clear_update_discount_error: (state) => {
            state.updateDiscountError = null
        },
        clear_delete_product_error: (state) => {
            state.deleteProductError = null
        },
        create_product_reset: (state) => {
            state.isCreated = false
        },
        delete_product_reset: (state) => {
            state.isProductDeleted = false
        },
        update_product_reset: (state) => {
            state.isProductUpdated = false
        },
        update_discount_reset: (state) => {
            state.isDiscountUpdated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state, action) => {
            state.createProductLoading = true
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.createProductLoading = false
            state.isCreated = true;
            // state.products.unshift(action.payload.product);
            state.adminProducts.unshift(action.payload.product);
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.createProductLoading = false
            state.createProductError = action.error.message
        })
        
        builder.addCase(fetchProducts.pending, (state) => {
            state.fetProductsLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.fetProductsLoading = false
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.resultPerPage = action.payload.resultPerPage
            state.filteredProductsCount = action.payload.filteredProductsCount
            state.fetchProductError = ''
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.fetProductsLoading = false
            state.products = []
            state.fetchProductError = action.error.message
        })

        builder.addCase(getAdminProducts.pending, (state, action) => {
            state.getAdminProductsLoading = true
        })
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.getAdminProductsLoading = false
            state.adminProducts = action.payload.products
        })
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.getAdminProductsLoading = false
            state.getAdminProductsError = action.error.message
        })

        builder.addCase(getProductDetails.pending, (state, action) => {
            state.getProductDetailsLoading = true
        })
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.getProductDetailsLoading = false
            state.productDetails = action.payload.product
            state.relatedProducts = action.payload.relatedProducts
        })
        builder.addCase(getProductDetails.rejected, (state, action) => {
            state.getProductDetailsLoading = false
            state.getProductDetailsError = action.error.message
        })
        // builder.addCase(getProducts.pending, (state, action) => {
        //     state.getProductsLoading = true
        // })
        // builder.addCase(getProducts.fulfilled, (state, action) => {
        //     state.getProductsLoading = false
        //     state.products = action.payload.products
        // })
        // builder.addCase(getProducts.rejected, (state, action) => {
        //     state.getProductsLoading = false
        //     state.getProductsError = action.error.message
        // })
        // update Product
        builder.addCase(updateProduct.pending, (state, action) => {
            state.updateProductLoading = true
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.updateProductLoading = false
            state.isProductUpdated = action.payload.success
            state.products = state.products.map((product) => {
                if (product._id === action.payload.product._id) {
                    return action.payload.product
                }
                else {
                    return product
                }
            })
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.updateProductLoading = false
            state.updateProductError = action.error.message
        })
        // Update discount
        builder.addCase(updateDiscount.pending, (state, action) => {
            state.updateDiscountLoading = true;
        });

        builder.addCase(updateDiscount.fulfilled, (state, action) => {
            state.updateDiscountLoading = false;
            state.isDiscountUpdated = action.payload.success;

            // Update state.products with the updated products
            state.adminProducts = state.adminProducts.map((product) => {
                const updatedProduct = action.payload.updatedProducts.find((p) => p._id === product._id);
                if (updatedProduct) {
                    return {
                        ...product,
                        hasDiscount: updatedProduct.hasDiscount,
                        discountPercentage: updatedProduct.discountPercentage,
                    };
                } else {
                    return product;
                }
            });
            state.products = state.products.map((product) => {
                const updatedProduct = action.payload.updatedProducts.find((p) => p._id === product._id);
                if (updatedProduct) {
                    return {
                        ...product,
                        hasDiscount: updatedProduct.hasDiscount,
                        discountPercentage: updatedProduct.discountPercentage,
                    };
                } else {
                    return product;
                }
            });
        });

        builder.addCase(updateDiscount.rejected, (state, action) => {
            state.updateDiscountLoading = false;
            state.updateDiscountError = action.error.message;
        });

        // delete Product
        builder.addCase(deleteProducts.pending, (state, action) => {
            state.deleteProductLoading = true
        })
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.deleteProductLoading = false
            state.isProductDeleted = action.payload.success;
            const deletedProductIds = action.payload.deletedProductIds;
            // const index = state.adminProducts.findIndex((product) => product._id === action.payload.deletedProductId);
            // // If the product is found, remove it from the state
            // if (index !== -1) {
            //     state.adminProducts.splice(index, 1);
            // }
            deletedProductIds.forEach((deletedProductId) => {
                const index = state.adminProducts.findIndex((product) => product._id === deletedProductId);

                if (index !== -1) {
                    state.adminProducts.splice(index, 1);
                }
            });
            deletedProductIds.forEach((deletedProductId) => {
                const index = state.products.findIndex((product) => product._id === deletedProductId);

                if (index !== -1) {
                    state.products.splice(index, 1);
                }
            });
        })
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.deleteProductLoading = false
            state.deleteProductError = action.error.message
        })
    }
})


export default productSlice.reducer
export const { clear_create_product_error, clear_update_product_error, clear_get_products_error, clear_delete_product_error, create_product_reset, delete_product_reset, update_product_reset, clear_get_admin_products_error, update_discount_reset, clear_update_discount_error } = productSlice.actions