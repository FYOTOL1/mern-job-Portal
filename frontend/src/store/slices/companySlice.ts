/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINT_URI } from "../../constants";
import axios from "axios";
import { toast } from "sonner";
import { IRejectWithValue } from "../../types/publicTypes";
import { ICompany } from "../../types/companyTypes";

type TInitialState = {
    loading: boolean;
    companies: ICompany[] | []
    singleCompany: ICompany | null
    searchCompanyByText: string
};
const initialState: TInitialState = {
    loading: false,
    companies: [],
    singleCompany: null,
    searchCompanyByText: ''
};

export const registerNewCompany = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>("company/registerNewCompany", async (companyName: string, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.post(`${API_ENDPOINT_URI}/company/register`, { companyName }, { withCredentials: true })
        return { ...res.data, message: res.data.message }
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const getUserCompanies = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>("company/getUserCompanies", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.get(`${API_ENDPOINT_URI}/company/get`, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const updateUserCompany = createAsyncThunk<any, { data: FormData, companyId: string | undefined }, { rejectValue: IRejectWithValue }>("company/updateUserCompany", async ({ data, companyId }, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.post(`${API_ENDPOINT_URI}/company/update/${companyId}`, data, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setSingleCompany: (state, { payload }) => {
            state.singleCompany = payload
        },
        setSearchCompanyByText: (state, { payload }) => {
            state.searchCompanyByText = payload
        }
    },

    extraReducers: (builder) => {
        builder
            // Post
            .addCase(registerNewCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(registerNewCompany.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success) {
                    toast.success(payload.message)
                }
            })
            .addCase(registerNewCompany.rejected, (state, { payload }) => {
                state.loading = false
                toast.error(payload?.message)
            })
            // Get
            .addCase(getUserCompanies.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserCompanies.fulfilled, (state, { payload }) => {
                state.loading = false
                state.companies = payload.companies
                state.singleCompany = payload.company
            })
            .addCase(getUserCompanies.rejected, (state, { payload }) => {
                state.loading = false
                toast.error(payload?.message)
            })
            // Update
            .addCase(updateUserCompany.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserCompany.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success) {
                    const message = payload.message as string
                    toast.success(message)
                }
            })
            .addCase(updateUserCompany.rejected, (state, { payload }) => {
                state.loading = false
                toast.error(payload?.message)
            })
    }
});

export const { setSingleCompany, setSearchCompanyByText } = companySlice.actions
export default companySlice.reducer;
