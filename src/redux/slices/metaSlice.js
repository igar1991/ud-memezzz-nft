import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const { providers } = require('ethers');


export const getAdress = createAsyncThunk('meta/getAdress',
    async function (_, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');

            const addresses = await provider.send("eth_requestAccounts", []);

            return addresses[0]
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const fillUD = createAsyncThunk('meta/fillUD',
    async function (data, { rejectWithValue }) {
        return data;
    }
)

export const metaSlice = createSlice({
    name: "meta",
    initialState: {
        modalMeta: false,
        metaInstalled: typeof window.ethereum === 'undefined'?false:true,
        networkId: null,
        userAdress: null,
        status: "start",
        error: null,
    },
    reducers: {
        modalisMeta: (state, action)=>{
            state.modalMeta = action.payload
        },
        getNetwork: (state, action)=> {
            state.networkId=parseInt(action.payload)
        }
    },
    extraReducers: {
        [getAdress.pending]: (state) => {
            console.log("Нyчалачь МЕТАМАСК")
        },
        [getAdress.fulfilled]: (state, action) => {
            state.userAdress = action.payload
            console.log("загрузка закончена МЕТАМАСК")
        },
        [fillUD.fulfilled]: (state, action) => {
            console.log(state, action)
            console.log("fillUD fulfilled")

            state.userAdress = action.payload
            state.networkId=100

        },
        [getAdress.rejected]: (state, action) => {
            state.status = "error"
            console.log("Errorrr МЕТАМАСК")
            state.error = action.payload
        }
    }
})

export const { getNetwork, modalisMeta } = metaSlice.actions

export default metaSlice.reducer
