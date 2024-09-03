import { IApplication } from "./applicationTypes";

interface ICompany {
    name: string;

    description: string;

    website: string;

    location: string;

    logo: string;

    userId: string;

    createdAt?: Date;

    updatedAt?: Date;
}

interface IJob {
    _id: string;

    title: string;

    description?: string;

    requirements?: string;

    salary?: number;

    experience?: number;

    location?: string;

    jobType?: string;

    position?: number;

    company: ICompany;

    applications: IApplication[];

    createdAt?: Date;

    updatedAt?: Date;
}

export type { IJob };
