import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import productTypesReducer from "../features/productType/productTypeSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import reviewReducer from "../features/review/reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    productType: productTypesReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
  },
});

export default store;
