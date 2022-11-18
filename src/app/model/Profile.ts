
export class Profile {
    name!: string;
    email!: string;
    dob?: Date;
    gender!: string;
    address!: string;
    country!: string;
    isStudent!: string;
    state!: string;
    userImage!: string;
    isProfileCompleted!: boolean;
    fromProfile!: boolean;
    teacherObj!: TeacherObj;
    userImagePath!:any;
    verified!:any;

}

export class TeacherObj {
    teacherName!: string;
    teacherImage!: string;
    facebookPage!: string;
    instaPage!: string;
    youtubePage!: string;
    teacherPage!: string;
    linkedInPage!: string;
    teacherOneLineDescription!: string;
    metaTags!: string[];
    metaDescription!: string;
    experience!: string;
    isPrivate!: boolean;
    teacherTeasorVideo!:any;
}