import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitKyc = createAsyncThunk('user/submit-kyc', async ({ userId, mobile, dob, name }, _) => {
    const [dayOfMonth, month, year] = dob.split('/');
    const response = await axios.post('/api/users/submit-kyc', {
        userId,
        mobile,
        dob: {
            dayOfMonth,
            month,
            year
        },
        salutation: 'Mr.',
        firstName: name,
        lastName: 'Test',
        gender: 'Male'
    });
    return response.data;
});

export const getSummary = createAsyncThunk('user/summary', async (userId, _) => {
    const response = await axios.post('/api/users/summary', { userId });
    return response.data;
});

export const getTransactions = createAsyncThunk('user/transactions', async (userId, _) => {
    const response = await axios.post('/api/users/transactions', { userId });
    return response.data;
});

export const getLinkedAccounts = createAsyncThunk('user/linked-accounts', async (userId, _) => {
    const response = await axios.post('/api/users/linked-accounts', { userId });
    return response.data;
});

