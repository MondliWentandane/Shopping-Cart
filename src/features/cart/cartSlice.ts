import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem, AddCartItemData, EditCartItemData } from "../../types";
import { cartAPI } from "../../services/cartAPI";
import { clearError } from "../auth/authSlice";

const initialState: CartState={
    items: [],
    isLoading: false,
    error: null,
};

export const fetchCartItems = createAsyncThunk(
    'cart/fetchItems',
    async(userId: number, {rejectWithValue})=>{
        try {
            const items = await cartAPI.getCartItems(userId);
            return items;
        }catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const addCartItem = createAsyncThunk(
    'cart/addItem',
    async({userId, itemData}: {userId: number; itemData: AddCartItemData}, {rejectWithValue})=>{
        try {
            const newItem = await cartAPI.addCartItem(userId, itemData);
            return newItem;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateItem',
    async({itemId, itemData}: {itemId: number; itemData: EditCartItemData}, {rejectWithValue})=>{
        try{
            const updatedItem = await cartAPI.updateCartItem(itemId, itemData);
            return updatedItem;
        } catch(error: any){
            return rejectWithValue(error.message);  
        }
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteItem',
    async(itemId: number, {rejectWithValue})=>{
        try {
            await cartAPI.deleteCartItem(itemId);
            return itemId;
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        clearError:(state)=>{
            state.error = null;
        },
        clearCart:(state)=>{
            state.items = [];
        },
     },
     extraReducers(builder) {
         builder.addCase(fetchCartItems.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
         })
         .addCase(fetchCartItems.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.items = action.payload;
            state.error = null;
         })
         .addCase(fetchCartItems.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload as string;
         })

         .addCase(addCartItem.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
         })
         .addCase(addCartItem.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.items.push(action.payload);
            state.error = null;
         })
         .addCase(addCartItem.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload as string;
         })
         //==== Continue from update Item case
     },
})



