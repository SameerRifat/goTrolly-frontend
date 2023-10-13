import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import productTypesReducer from "../features/productType/productTypeSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    brand: brandReducer,
    product: productReducer,
    productType: productTypesReducer,
    cart: cartReducer,
  },
});

export default store;
