import { createSlice } from "@reduxjs/toolkit";
import { initiateAuth } from "./thunks/auth";
import { getLinkedAccounts, getSummary, getTransactions, submitKyc } from "./thunks/user";

const initialState = {
    loading: 'idle',
    entity: {},
    summary: {
        loading: 'idle',
        entity: {}
    },
    transactions: {
        loading: 'idle',
        entity: []
    },
    linked_accounts: {
        loading: 'idle',
        entity: []
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(submitKyc.fulfilled, (state, action) => {
            state.entity = action.payload;
        });

        builder.addCase(getSummary.pending, (state, _) => {
            state.summary.loading = 'loading';
        });

        builder.addCase(getSummary.fulfilled, (state, action) => {
            state.summary.loading = 'fulfilled';
            state.summary.entity = action.payload;
        });

        builder.addCase(getTransactions.pending, (state, _) => {
            state.transactions.loading = 'loading';
        });

        builder.addCase(getTransactions.fulfilled, (state, action) => {
            state.transactions.loading = 'fulfilled';
            state.transactions.entity = action.payload;
        });

        builder.addCase(initiateAuth.fulfilled, (state, action) => {
            if (action.payload.user) {
                state.loading = 'fulfilled';
                state.entity = action.payload.user;    
            }
        });

        builder.addCase(getLinkedAccounts.pending, (state, _) => {
            state.linked_accounts.loading = 'loading';
        });

        builder.addCase(getLinkedAccounts.fulfilled, (state, action) => {
            state.linked_accounts.loading = 'fulfilled';
            state.linked_accounts.entity = action.payload;
        })
    }
});

export default userSlice.reducer;