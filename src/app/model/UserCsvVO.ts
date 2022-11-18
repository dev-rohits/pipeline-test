export class UserCsvVO {
    id!: number;
    name!: string;
    email!: string;
    mobileNumber!: number;
    gender!:string;
    role!: string;
    batchCode!:string;
    status!:string;
    error!:string;
}

export interface CsvUploadRecordsVO {
      id:number,
	  successCount:number,
	  failedCount:number,
	  totalRecords:number,
	  uploadedBy:number,
	  uploadedAt:Date,
	  instituteId:number,
      csvFilePath:string,
}