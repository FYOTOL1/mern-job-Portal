/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IJob } from "../../types/jobTypes";
import { API_ENDPOINT_URI } from "../../constants";
import axios from "axios";
import { toast } from "sonner";
import { IRejectWithValue } from "../../types/publicTypes";
import { IApplication } from "../../types/applicationTypes";


interface IResponse {
    message: string
    jobs: IJob[]
    success: boolean
}

type TPostJob = {
    title: string,
    description: string,
    requirements: string,
    salary: number,
    location: string,
    jobType: string,
    experience: number,
    position: number,
    companyId: string,
}

type TInitialState = {
    loading: boolean;
    allJobs: IJob[] | [];
    adminJobs: IJob[] | [];
    singleJob: IJob | null;
    isAppliedJob: boolean;
    searchJobByText: string;
    applicants: IJob | []
    userAppliedJobs: IApplication[] | []
    searchedQuery: string
};
const initialState: TInitialState = {
    loading: false,
    allJobs: [],
    adminJobs: [],
    singleJob: null,
    isAppliedJob: false,
    searchJobByText: "",
    applicants: [],
    userAppliedJobs: [],
    searchedQuery: ""
};

export const postJob = createAsyncThunk<any, TPostJob, { rejectValue: IRejectWithValue }>("job/postJob", async (data, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.post(`${API_ENDPOINT_URI}/job/post`, data, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const getAllJobs = createAsyncThunk("job/getAllJobs", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.get(`${API_ENDPOINT_URI}/job/get`, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const getAdminJobs = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>("job/getAdminJobs", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.get(`${API_ENDPOINT_URI}/job/get/admin/jobs`, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const getSingleJob = createAsyncThunk("job/getSingleJob", async (jobId: string | undefined, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.get(`${API_ENDPOINT_URI}/job/get/${jobId}`, { withCredentials: true })
        return res.data.job
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const applyJob = createAsyncThunk<any, string | undefined, { rejectValue: IRejectWithValue }>("job/applyJob", async (jobId: string | undefined, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const res = await axios.get(`${API_ENDPOINT_URI}/application/apply/${jobId}`, { withCredentials: true })
        return res.data
    } catch (error: any) {
        return rejectWithValue({
            message: error.response.data.message,
            success: error.response.data.success,
            status: error.response.status
        } as IRejectWithValue)
    }
})

export const getApplicants = createAsyncThunk<any, string | undefined, { rejectValue: IRejectWithValue }>
    ("job/getApplicants", async (jobId: string | undefined, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const res = await axios.get(`${API_ENDPOINT_URI}/application/${jobId}/applications`, { withCredentials: true })
            return res.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.response.data.message,
                success: error.response.data.success,
                status: error.response.status
            } as IRejectWithValue)
        }
    })

export const getUserAppliedJobs = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>
    ("job/getUserAppliedJobs", async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const res = await axios.get(`${API_ENDPOINT_URI}/application/get`, { withCredentials: true })
            return res.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.response.data.message,
                success: error.response.data.success,
                status: error.response.status
            } as IRejectWithValue)
        }
    })

export const updateApplicantStatus = createAsyncThunk<any, { status: string, applicantId: string }, { rejectValue: IRejectWithValue }>
    ("job/updateApplicantStatus", async (data: { status: string, applicantId: string }, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const res = await axios.post(`${API_ENDPOINT_URI}/application/status/${data.applicantId}/update`, { status: data.status }, { withCredentials: true })
            return res.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.response.data.message,
                success: error.response.data.success,
                status: error.response.status
            } as IRejectWithValue)
        }
    })

export const getSearchedJobsByKeyword = createAsyncThunk<any, string, { rejectValue: IRejectWithValue }>
    ("job/getSearchedJobsByKeyword", async (query: string, thunkApi) => {
        const { rejectWithValue } = thunkApi
        try {
            const res = await axios.get(`${API_ENDPOINT_URI}/job/get?keyword=${query.toLowerCase()}`, { withCredentials: true })
            return res.data
        } catch (error: any) {
            return rejectWithValue({
                message: error.response.data.message,
                success: error.response.data.success,
                status: error.response.status
            } as IRejectWithValue)
        }
    })

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setAllJobs: (state, { payload }) => {
            state.allJobs = payload;
        },
        setSingleJob: (state, { payload }) => {
            state.allJobs = payload
        },
        setSearchJobByText: (state, { payload }) => {
            state.searchJobByText = payload
        },
        setSearchQuery: (state, { payload }) => {
            state.searchedQuery = payload
        }
    },

    extraReducers: (builder) => {
        builder
            // Post Job
            .addCase(postJob.pending, (state) => {
                state.loading = true
            })
            .addCase(postJob.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success) toast.success(payload.message)
            })
            .addCase(postJob.rejected, (state, { payload }) => {
                state.loading = false
                toast.error(payload?.message)
            })
            // Get All Jobs
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllJobs.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allJobs = payload.jobs
            })
            .addCase(getAllJobs.rejected, (state) => {
                state.loading = false

            })
            // Get Keyword Jobs
            .addCase(getSearchedJobsByKeyword.pending, (state) => {
                state.loading = true
            })
            .addCase(getSearchedJobsByKeyword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.allJobs = payload.jobs
            })
            .addCase(getSearchedJobsByKeyword.rejected, (state) => {
                state.loading = false

            })
            // Get Admin Jobs
            .addCase(getAdminJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getAdminJobs.fulfilled, (state, { payload }: { payload: IResponse }) => {
                state.loading = false
                state.adminJobs = payload.jobs
            })
            .addCase(getAdminJobs.rejected, (state, { payload }) => {
                state.loading = false
                toast.error(payload?.message)
            })
            // Get Single Job
            .addCase(getSingleJob.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleJob.fulfilled, (state, { payload }) => {
                state.loading = false
                state.singleJob = payload

            })
            .addCase(getSingleJob.rejected, (state) => {
                state.loading = false

            })
            // Apply Job
            .addCase(applyJob.pending, (state) => {
                state.loading = true
            })
            .addCase(applyJob.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success === true) {
                    toast.success(payload.message)
                }
            })
            .addCase(applyJob.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 401) {
                    toast.error("Login Required");
                } else if (payload) {
                    toast.error(payload.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            })
            // Get Applicants
            .addCase(getApplicants.pending, (state) => {
                state.loading = true
            })
            .addCase(getApplicants.fulfilled, (state, { payload }) => {
                state.loading = false
                state.applicants = payload.job
            })
            .addCase(getApplicants.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 401) {
                    toast.error("Login Required");
                } else if (payload) {
                    toast.error(payload.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            })
            // Update Status
            .addCase(updateApplicantStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(updateApplicantStatus.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success) {
                    toast.success(payload.message)
                }
            })
            .addCase(updateApplicantStatus.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 401) {
                    toast.error("Login Required");
                } else if (payload) {
                    toast.error(payload.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            })
            // User Applied Jobs
            .addCase(getUserAppliedJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserAppliedJobs.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload.success) {
                    state.userAppliedJobs = payload.application
                }
            })
            .addCase(getUserAppliedJobs.rejected, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 401) {
                    toast.error("Login Required");
                } else if (payload) {
                    toast.error(payload?.message);
                } else {
                    toast.error("An unexpected error occurred");
                }
            })
    }
});

export const { setLoading, setAllJobs, setSingleJob, setSearchJobByText, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
