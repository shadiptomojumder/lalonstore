import { User } from "@/interfaces/user.schemas";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { store } from "../store";

interface UserState {
    user: User | null;
    accesstoken: string | null;
}

const initialState: UserState = {
    user: null,
    accesstoken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; accesstoken: string }>) => {
            state.user = action.payload.user;
            state.accesstoken = action.payload.accesstoken;
        },
        logout: (state) => {
            state.user = null;
            state.accesstoken = null;
            persistStore(store).purge(); // Purge persisted storage
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
