interface IProfile {
  bio?: string;
  skills?: string[] | string;
  resume?: string;
  resumeOriginalName?: string;
  company?: string;
  profilePhoto?: string;
}

interface IUser {
  _id?: string;
  fullName: string;
  phoneNumber: number;
  email: string;
  password?: string;
  role: "student" | "recruiter" | null;
  profile?: IProfile;
  file: File | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { IUser };
