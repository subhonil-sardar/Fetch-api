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
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) =>{
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return id;
});
export const createProduct = createAsyncThunk('products/createProduct', async (product) =>{
    const res = await axios.post(BASE_URL, product);
    return res.data
});
export const updateProduct = createAsyncThunk('products/updateProduct', async ({id, product}) =>{
    const res = await axios.put(`${BASE_URL}/${id}`, product);
    return res.data
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers : {},

    extraReducers : (builder) =>{
        builder.addCase(fetchProducts.pending, (state) =>{
            state.isloading = true;
            state.error = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) =>{
            state.products = action.payload;
            state.isloading = false;
        });
        builder.addCase(fetchProducts.rejected, (state, action) =>{
            state.isloading = false;
            state.error = "Faild fetch datta" || action.error.message;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) =>{
         state.products = state.products.filter((product) => product.id !== action.payload)
        });
        builder.addCase(createProduct.fulfilled, (state, action) =>{
            state.products.push(action.payload);
           });
        builder.addCase(updateProduct.fulfilled, (state, action) =>{
            const index = state.products.findIndex((product)=> product.id === action.payload.id);
            state.products[index] = action.payload;
           });
    }
});

export default productSlice.reducer;