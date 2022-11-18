export class Auth {
  access_token!: string;
  token_type!: string;
  first_name!: string;
  refresh_token!: string;
  expires_in!: number;
  email!:string;
  scope!:string;
  role!:Role;
  user_unique_login_token!: string;
  user_id!: string;
  id!: string;
  jti!: string;
  isSelfTeacher!: boolean;
  bucketName!: string;
  selectedInstitute?:number
}
export interface Role {
    authority?: string;
    roleType?:string;
  }