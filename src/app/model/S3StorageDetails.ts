export class S3StorageDetails {
  bucketSize!: number;
  vacantSpace!: number;
  usedSpace!: number;
  uploadedFiles!: S3FileInfo[];
}

export class S3FileInfo {
  bucketName!: string;
  key!: string;
  lastModifiedDate!: Date;
  size!: number;
  etag!: string;
  filePath!: string;
  selected!: boolean;
}
