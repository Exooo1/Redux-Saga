import {createSlice} from "@reduxjs/toolkit";
import  axios from 'axios'

const slice = createSlice({
    name:'user',
    reducers:{},
    initialState:{},
})

export const userReducer = slice.reducer