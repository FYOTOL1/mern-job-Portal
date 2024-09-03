import { IJob } from "./jobTypes";
import { IUser } from "./userTypes";

interface IApplication {
    _id: string,

    job: IJob;

    applicant: IUser;

    status?: "pending" | "accepted" | "rejected";

    createdAt?: Date;

    updatedAt?: Date;
}

export type { IApplication }