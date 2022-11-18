export interface DemoClass {
  idClassSchedule: number;
  startDate: Date;
  endDate: Date;
  classTitle: string;
  teacherName: string;
  status: string;
}

export interface DemoClassRes {
  body: DemoClass[];
}
