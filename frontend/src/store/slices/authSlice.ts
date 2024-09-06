/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import axios from "axios";
import { toast } from "sonner";
import { API_ENDPOINT_URI } from "../../constants";
import { IRejectWithValue } from "../../types/publicTypes";

type TInitialState = {
  loading: boolean;
  user: IUser | null;
  success: boolean | null,
  lang: "ar" | "en"
};
const initialState: TInitialState = {
  loading: false,
  user: null,
  success: null,
  lang: "ar"
};

export const SignupUser = createAsyncThunk<any, FormData, { rejectValue: IRejectWithValue }>("auth/signupUser", async (formData, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const res = await axios.post(`${API_ENDPOINT_URI}/user/register`, formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true, }
    );
    return res.data
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success,
      status: error.response.status
    })
  }
})

export const LoginUser = createAsyncThunk<any, { email: string, password: string, role: string }, { rejectValue: IRejectWithValue }>("auth/loginUser", async (input, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const res = await axios.post(`${API_ENDPOINT_URI}/user/login`, input, { withCredentials: true });
    return res.data
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success,
      status: error.response.status
    })
  }
})

export const UpdateUser = createAsyncThunk<any, FormData, { rejectValue: IRejectWithValue }>("auth/updateUser", async (formData, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const res = await axios.post(`${API_ENDPOINT_URI}/user/profile/update`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
    return res.data
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success,
      status: error.response.status
    })
  }
})

export const LogoutUser = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>("auth/logoutUser", async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi
  try {
    const res = await axios.get(`${API_ENDPOINT_URI}/user/logout`, { withCredentials: true })
    return res.data
  } catch (error: any) {
    return rejectWithValue({
      message: error.response.data.message,
      success: error.response.data.success,
      status: error.response.status
    })
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setLanguage: (state, { payload }) => {
      state.lang = payload
    },
    resetSuccess: (state, { payload }) => {
      state.success = payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(SignupUser.pending, (state) => {
        state.loading = true
      })
      .addCase(SignupUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload.user
        toast.success(payload.message)
      })
      .addCase(SignupUser.rejected, (state, { payload }) => {
        state.loading = false
        toast.error(payload?.message)
      })
      // Login
      .addCase(LoginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(LoginUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = payload.user
        toast.success(payload.message)
      })
      .addCase(LoginUser.rejected, (state, { payload }) => {
        state.loading = false
        toast.error(payload?.message)
      })
      // Update
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.success = true
        state.user = payload.updateUser
        toast.success(payload.message)
      })
      .addCase(UpdateUser.rejected, (state, { payload }) => {
        state.loading = false
        toast.error(payload?.message)
      })
      // Logout
      .addCase(LogoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(LogoutUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.user = null
        toast.success(payload.message)
      })
      .addCase(LogoutUser.rejected, (state, { payload }) => {
        state.loading = false
        toast.error(payload?.message)
      })


  }
})

export const { setLoading,setLanguage, resetSuccess } = authSlice.actions;
export default authSlice.reducer;
