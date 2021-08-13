import { configureStore  } from "@reduxjs/toolkit";
import AuthReducer from "./core/auth";
import UserReducer from "./core/user";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        user: UserReducer
    }
});