export interface IMockedCoursesList {
  title: string,
  description: string,
  created: string;
  duration: number,
  authors: string[],
}

export const mockedCoursesList: IMockedCoursesList[] = [
  {
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book. It has survived
                    not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                    nchanged.`,
    created: '08.03.2021',
    duration: 160,
    authors: ['Vasiliy Dobkin', 'Anna Sidorenko'],
  },
  {
    title: 'Angular',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book.`,
    created: '10.11.2020',
    duration: 210,
    authors: ['Valentina Larina', 'Nicolas Kim'],
  },
];
