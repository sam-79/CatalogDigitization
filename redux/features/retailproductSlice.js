import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProduct, getProductStats } from '../../src/api/retailproduct';
import { Alert } from 'react-native';

const initialState = {
    productsList: [],
    productStats: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null
};


export const retailproductSlice = createSlice({
    name: 'retailproduct',
    initialState,
    reducers: {

    },

    extraReducers: builder => {
        // product list cases
        builder.addCase(getAllProduct.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getAllProduct.fulfilled, (state, action) => {

            console.log("fulling retailProduct.js ;ine 29", action)

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.error = null;
            state.productsList = action.payload != undefined ? action.payload.products : [];


        });
        builder.addCase(getAllProduct.rejected, (state, action) => {
            //console.log("reject retailProduct.js ;ine 38", action)

            //console.log(action)
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
            Alert.alert("Error", "Failed to fetch products")
        });

        //stats cases
        builder.addCase(getProductStats.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getProductStats.fulfilled, (state, action) => {

            //console.log("fulling retailProduct.js ;ine 27", action)

            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.error = null;
            state.productStats = action.payload != undefined ? action.payload : null;


        });
        builder.addCase(getProductStats.rejected, (state, action) => {
            //console.log("reject retailProduct.js ;ine 38", action)

            //console.log(action)
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload;
            Alert.alert("Error", "Failed to fetch products")
        });
    },
})


export default retailproductSlice.reducer;

