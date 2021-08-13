import { createSlice } from '@reduxjs/toolkit'
import { getNextRoute, initiateAuth, verify } from './thunks/auth';
import { submitKyc } from './thunks/user';

const initialState = {
  loading: 'idle',
  logged: false,
  userId: '',
  mobile: '',
  next: '',
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    markLoggedIn: (state) => {
      state.logged = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initiateAuth.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.logged = action.payload.logged;
      state.userId = action.payload.userId;
      state.mobile = action.payload.mobile;
      state.next = action.payload.next;
    });

    builder.addCase(verify.pending, (state, action) => {
      state.loading = 'pending'
    });

    builder.addCase(verify.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.logged = action.payload.logged;
      state.userId = action.payload.user._id;
      state.mobile = action.payload.user.mobile;
      state.next = action.payload.next;
    });

    builder.addCase(submitKyc.fulfilled, (state, action) => {
      state.next = '/';
    });

    builder.addCase(getNextRoute.fulfilled, (state, action) => {
      state.next = action.payload.next;
    })
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export default authSlice.reducer