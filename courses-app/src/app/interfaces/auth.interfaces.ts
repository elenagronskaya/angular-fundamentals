export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
}

export interface IRegistrationRequest {
  successful: boolean;
  result: string;
}

export interface IUser{
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
}
export interface IUserResponse {
  successful: boolean;
  result: IUser;
}

export interface ICoursesResponse {
  successful?: boolean;
  result: ICourseData[];
}

export interface ICourseData {
  authors: string[];
  creationDate?: string;
  description: string;
  duration: number;
  id?: string;
  title: string;
  isEdited?: boolean;
}
