// export interface TeacherList {
//   idTeacher: number;
//   id: number;
//   name: string;
//   teacherName: string;
//   address: string;
//   facebookPage: string;
//   instaPage: string;
//   youtubePage: string;
//   teacherPage: string;
//   description: string;
//   createdDate: Date;
//   updatedDate?: any;
//   userId: number;
//   imagePath: string;
//   teacherImagePath: string;
//   courseCount: number;
//   teacherImage: string;
// }

// export interface Data {
//   teacherList: TeacherList[];
// }

// export interface FetchTeacherHomeRes {
//   data: Data;
// }

// RAMAN
export interface TeachersList {
  id: number;
  name: string;
  description: string;
  teacherImage: string;
  teacherImagePath: string;
  weightedAverage: string;
  experience: any;
  email: string;
}
export interface TeachersListData {
  teachersList: TeachersList[];
}

export interface TeachersListRes {
  data: TeachersListData;
}
