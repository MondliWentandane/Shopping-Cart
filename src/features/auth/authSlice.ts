import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginData, RegisterData } from "../../types";
import { authAPI } from "../../services/authAPI";

const getInitialState = (): AuthState=>{
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return{
        user: user ? JSON.parse(user) : null,
        token: token || null,
        isLoading: false,
        error: null,
    };
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData: RegisterData, {rejectWithValue}) =>{
        try {
            const response = await authAPI.register(userData);
            return response;
        } catch (error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async(loginData: LoginData, { rejectWithValue}) => {
        try {
            const response = await authAPI.login(loginData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchProfile',
    async(userId: number, {rejectWithValue}) => {
        try {
            const userProfile = await authAPI.getProfile(userId);
            return userProfile;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async({ userId, userData }: { userId: number; userData: any }, { rejectWithValue }) => {
        try {
            const response = await authAPI.updateProfile(userId, userData);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        clearError: (state)=>{
            state.error = null;
        },
        logout:(state) =>{
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setLoading:(state, action:PayloadAction<boolean>) =>{
            state.isLoading = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user= action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(fetchUserProfile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(fetchUserProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload as string;
        })
        .addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        })
        .addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const {clearError, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;