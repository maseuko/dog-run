import { createSlice } from "@reduxjs/toolkit";

const authReducer  = createSlice({
    name: "auth",
    initialState: {
        logged: false,
        authToken: "",
        refreshToken: ""
    },
    reducers: {
        setLoggedState(state, actions){
            state.logged = actions.payload;
        },
        setTokens(state, actions){
            const {authToken, refreshToken} = actions.payload;
            state.authToken = authToken;
            state.refreshToken = refreshToken;
        }
    }
});

export const { setLoggedState, setTokens } = authReducer.actions;

export default authReducer.reducer;