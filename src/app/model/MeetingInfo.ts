export class MeetingInfo {
    meetingNumber !: number;
    userName !: string;
    email !: string;
    signature !: string;
    passWord ?: string;
    role?:string
}

export class SignatureModel {
    apiKey ?: string = "o1ogFMjPSsOj33pSNuE5Tw";
    apiSecret ?: string = "1yMomS1gCYYaqcOYdNyRPn8IcW9PGDcb8xA0";
    role ?: string = "0"
}