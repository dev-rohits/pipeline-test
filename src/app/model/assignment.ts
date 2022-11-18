export interface Body {
    id: number;
    name: string;
    description: string;
    weightage: number;
    percentage: number;
    submissionFrom?: any;
    submissionFromStr?: any;
    dueDateStr?: any;
    completionDateStr?: any;
    cutOffDateStr?: any;
    dueDate: Date;
    cutOffDate: Date;
    submissiontype: string;
    wordLimit: number;
    gradeType: string;
    createdBy: number;
    createdDate: Date;
    completionDate: Date;
    search_keyword: string;
    upload_file: string;
    maxMarks:number;
  }