interface IRejectWithValue {
    message: string;
    success: boolean;
    status: number;
}

type TInputUpdateUserCompany = {
    _id?: string,
    companyId: string
    name: string,
    description: string,
    website: string,
    location: string,
    file: File | undefined
    logo?: string
}


export type { IRejectWithValue, TInputUpdateUserCompany }