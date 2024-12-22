import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    products :[],
    isloading : false,
    error : null
};
const BASE_URL ='http://localhost:3003/products'
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () =>{
    const res = await axios.get(BASE_URL);
    return res.data;
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(fetchProducts.pending, (state) =>{
            state.isloading = true;
            state.error = null;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) =>{
            state.products = action.payload;
            state.isloading = false;
        })
        builder.addCase(fetchProducts.rejected, (state, action) =>{
            state.isloading = false;
            state.error = "Faild fetch datta" || action.error.message;
        })
    }
});

export default productSlice.reducer;