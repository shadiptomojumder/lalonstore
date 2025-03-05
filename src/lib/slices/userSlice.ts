import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    fullname: string;
    email: string;
    role: "USER" | "ADMIN";
    phone?: string;
    address?: string;
    googleId?: string;
    avatar?: string;
    otp?: number;
    refreshToken?: string;
}

interface UserState {
    user: User | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
