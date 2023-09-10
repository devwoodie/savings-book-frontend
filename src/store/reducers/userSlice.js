import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    nickname: "",
    token: ""
}

export const userSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setNickname: (state, action) => {
            state.nickname = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const {
    setNickname,
    setToken
} = userSlice.actions;

export default userSlice.reducer;
