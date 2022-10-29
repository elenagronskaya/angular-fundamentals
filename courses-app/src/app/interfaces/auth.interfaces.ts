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

export interface ICourseResponse {
  successful?: boolean;
  result: ICourseData;
}

export interface ICourseData {
  authors: string[];
  creationDate: string;
  description: string;
  duration: number;
  id: string | null;
  title: string;
  isEdited: boolean | null;
}

export interface IAuthorsResponse {
  result: IAuthor[];
  successful: boolean;
}

export interface IAuthorResponse {
  result: IAuthor;
  successful: boolean;
}

export interface IAuthor {
  name: string;
  id: string | null | undefined;
}

export interface IDeleteCourseResponse {
  result: any;
  successful: boolean;
}

export interface ICourseDataDTO
{
  authors: IAuthor[] | undefined;
  creationDate?: string;
  description: string;
  duration: number;
  id: string | null;
  title: string;
  isEdited: boolean | null;
}

export class CourseDataDTO implements ICourseDataDTO {
  authors: IAuthor[] | undefined;
  creationDate: string;
  description: string;
  duration: number;
  id: string | null;
  isEdited: boolean | null;
  title: string;

  constructor(authors: IAuthor [] | undefined,
              creationDate: string,
              description: string,
              duration: number,
              id: string | null,
              isEdited: boolean | null,
              title: string) {
      this.authors = authors
      this.creationDate = creationDate
      this.description = description
      this.duration = duration
      this.id = id
      this.isEdited = isEdited
      this.title = title;
  }

}

export class AuthorDTO implements IAuthor
{
  constructor(id: string | null, name: string) {
    this.id = id;
    this.name = name;
  }

  id: string | null;
  name: string;
}


