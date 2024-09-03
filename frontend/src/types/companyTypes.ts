interface ICompany {
    _id?: string

    name: string;

    description: string;

    website: string;

    location: string;

    logo: string;

    userId: string;

    createdAt?: Date;

    updatedAt?: Date;
}

export type { ICompany }