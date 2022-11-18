export interface teacherDetails {
  description: string;
  email: string;
  id: number;
  teacherImage: string;
  name: string;
  teacherTeasorVideoPath: string;
  weightedAverage: number;
  tags: string[];
  experience: string;
}
export interface teacherReviewlist {
  date: Date;
  id: number;
  rating: number;
  review: string;
  teacherId: number;
  userId: number;
  userName: string;
}
export class TeacherReviewAndRating {
  id!: number;
  userId!: number;
  teacherId!: number;
  rating!: number;
  review!: string;
  userName!: string;
  date!: Date;
}
export interface TeacherList {
  id: number;
  email: string;
  password: string;
  disabled: boolean;
  roleId?: any;
  roleName?: any;
  mobileNumber?: any;
  roleSet: RoleSet;
  userImage?: any;
  locked: boolean;
  loginAttempts?: any;
  lastPwdChangeDate?: any;
  currentLoginDate?: any;
  lastLoginDate?: any;
  first_name: string;
  last_name?: any;
  user_name: string;
}
export interface RoleSet {
  roleId: number;
  roleName: string;
  idInstitution: number;
}
