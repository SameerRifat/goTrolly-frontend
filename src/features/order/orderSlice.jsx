import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from '../../components/APIs/Api';
const { http } = API();

const initialState = {
  loading: false,
  order: {},
  error: "",
  myOrderLading: false,
  orders: [],
  myOrderError: '',
  getOrderDetailsLoading: false,
  orderDetails: null,
  getOrderDetailsError: '',
  getAdminOrdersLoading: false,
  adminOrders: [],
  getAdminOrdersError: '',
  updateOrderLoading: false,
  isOrderUpdated: false,
  updateOrderError: '',
  deleteOrdersLoading: false,
  isOrdersDeleted: false,
  deleteOrdersError: ''
};

export const createOrder = createAsyncThunk("order/createOrder", async (order) => {
  // const config = {
  //   headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
  // };
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    },
  };
  try {
    const response = await http.post("/api/v1/order/new", order, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error occurred while sending the request");
    }
  }
}
);

// myOrders
export const myOrders = createAsyncThunk("order/myOrders", async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  try {
    const response = await http.get("/api/v1/orders/me", config);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error occurred while sending the request");
    }
  }
});

export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  try {
    const response = await http.get(`/api/v1/order/${id}`, config);
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
})

// get all orders (Admin)
export const getAdminOrders = createAsyncThunk('products/getAdminOrders', async () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  try {
    const response = await http.get("/api/v1/admin/orders", config)
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

// update order
export const updateOrder = createAsyncThunk('order/updateOrder', async (data) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  };
  try {
    const response = await http.put(`/api/v1/admin/order/${data.id}`, data.myForm, config)
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

// delete orders (admin)
export const deleteOrders = createAsyncThunk('order/deleteOrders', async (orderIds) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    },
  };
  try {
    const dataToSend = JSON.stringify({ orderIds });
    const response = await http.delete(`/api/v1/admin/orders/delete`, {
      ...config,
      data: dataToSend,
    })
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clear_errors: (state) => {
      state.error = null;
      state.myOrderError = null,
        state.getOrderDetailsError = null,
        state.getAdminOrdersError = null,
        state.updateOrderError = null
    },
    update_order_reset: (state) => {
      state.isOrderUpdated = false;
    },
    // getOrderDetails: (state, action) => {
    //   console.log('action: ', action)
    //   const orderDetail = state.orders.find((order)=> {
    //     return order._id === action.payload
    //   });
    //   console.log('orderDetail: ', orderDetail)
    //   state.orderDetails = orderDetail
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //my orders
    builder.addCase(myOrders.pending, (state, action) => {
      state.myOrderLading = true;
    })
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.myOrderLading = false;
      state.orders = action.payload.orders;
    })
    builder.addCase(myOrders.rejected, (state, action) => {
      state.myOrderLading = false;
      state.myOrderError = action.error.message;
    })
    //get order details
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.getOrderDetailsLoading = true
    })
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.getOrderDetailsLoading = false
      state.orderDetails = action.payload.order
    })
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.getOrderDetailsLoading = false
      state.getOrderDetailsError = action.error.message
    })

    // get all orders (admin)
    builder.addCase(getAdminOrders.pending, (state) => {
      state.getAdminOrdersLoading = true
    })
    builder.addCase(getAdminOrders.fulfilled, (state, action) => {
      state.getAdminOrdersLoading = false
      state.adminOrders = action.payload.orders
    })
    builder.addCase(getAdminOrders.rejected, (state, action) => {
      state.getAdminOrdersLoading = false
      state.getAdminOrdersError = action.error.message
    })

    // update order 
    builder.addCase(updateOrder.pending, (state, action) => {
      state.updateOrderLoading = true
    })
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.updateOrderLoading = false
      state.isOrderUpdated = action.payload.success
      state.adminOrders = state.adminOrders.map((order) => {
        if (order._id === action.payload.updatedOrder._id) {
          return { ...order, orderStatus: action.payload.updatedOrder.orderStatus };
        } else {
          return order;
        }
      })
      state.orderDetails.orderStatus = action.payload.updatedOrder.orderStatus;
    })
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.updateOrderLoading = false
      state.updateOrderError = action.error.message
    })
    // delete orders (admin)
    builder.addCase(deleteOrders.pending, (state, action) => {
      state.deleteOrdersLoading = true
    })
    builder.addCase(deleteOrders.fulfilled, (state, action) => {
      state.deleteOrdersLoading = false
      state.isOrdersDeleted = action.payload.success
      const deletedOrderIds = action.payload.deletedOrderIds;
      deletedOrderIds.forEach((deletedOrderId) => {
        const index = state.adminOrders.findIndex((order) => order._id === deletedOrderId);

        if (index !== -1) {
          state.adminOrders.splice(index, 1);
        }
      });
      deletedOrderIds.forEach((deletedOrderId) => {
        const index = state.orders.findIndex((order) => order._id === deletedOrderId);

        if (index !== -1) {
          state.orders.splice(index, 1);
        }
      });
    })
    builder.addCase(deleteOrders.rejected, (state, action) => {
      state.deleteOrdersLoading = false
      state.deleteOrdersError = action.error.message
    })
  },
});

export default orderSlice.reducer;
export const { clear_errors, update_order_reset } = orderSlice.actions;
