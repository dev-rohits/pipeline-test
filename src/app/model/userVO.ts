import { RoleSet } from "./teacher-info";

export interface UserVO {
    id: number;
    firstName: string;
    lastName?: any;
    userName: string;
    email: string;
    password: string;
    sex: string;
    disabled: boolean;
    locked: boolean;
    roleId: number;
    mobileNumber?: any;
    userImage?: any;
    forgotPwdKey?: any;
    roleName?: any;
    updateType?: any;
    teacherObj?: any;
    roleSet: RoleSet;
    loginAttempts?: any;
    lastPwdChangeDate?: any;
    currentLoginDate?: any;
    lastLoginDate?: any;
    errorMsg?: any;
    userRoles?: any;
  }