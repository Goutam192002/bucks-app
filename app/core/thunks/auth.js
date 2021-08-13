import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const initiateAuth = createAsyncThunk('auth/initiate', async (mobile, _) => {
    const response = await axios.post('/api/auth/', { mobile });
    return response.data;
});

export const verify = createAsyncThunk('auth/verify', async ({mobile, code}, _) => {
    const response = await axios.post('/api/auth/verify', { mobile, code });
    return response.data;    
});

export const getNextRoute = createAsyncThunk('user/next-route', async (userId, _) => {
    const response = await axios.post('/api/auth/next', { userId });
    return response.data;
});