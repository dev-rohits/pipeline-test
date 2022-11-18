export interface ClassVO {
    
    id: number,
    name: string,
    start_date: Date,
    end_date: Date,
    teacher_name: string,
    teacherImage: string,
    duration:number,
    description: string,
    batchId: number,
      
}

export interface ClassRes {
body: ClassVO[];
total_count:number;
classes:ClassVO[];
}

export interface classData {
    body: ClassRes;
}

export class VideoTimeTracking{
    userId!: number;
    materialId!: number;
    videoResumeTiming!: number;
    watchTime!: number;
}

