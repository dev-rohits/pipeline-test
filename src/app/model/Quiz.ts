import { DateTime } from 'aws-sdk/clients/devicefarm';

export interface quiz {
  id: number;
  name: string;
  teacherName: string;
  marks: number;
  createdOn: Date;
  sections: any;
  startTime: DateTime;
  endTime: DateTime;
  teacherId: number;
  list: any;
}

export class QuizUpdate {
  id!: number;
  name!: string;
  examName!: string;
  teacherName!: string;
  marks!: number;
  sections!: sections[];
  startTime!: DateTime;
  obtainedMarks!: number;
  endTime!: DateTime;
  examDuration!: number;
  hour!: number;
  minutes!: number;
  examType!: string;
  instituteId!: number;
  negtiveMarking!: boolean;
  negtiveMarks!: number;
  list!: any;
}

export class sections {
  id!: number;
  sectionTitle!: string;
  sectionDescription!: string;
  displayOrder!: number;
  questions!: questions[];
}

export class questions {
  id!: number;
  questionTitle!: string;
  questionType!: string;
  questionImage!: string;
  questionImagePath!:string;
  displayOrder!: number;
  answers!: answers[];
  options!: options[];
  answer!: string;
  marks!: number;
  correctAnswer!: number;
  studentSubmittedAnswerId!: number;
  remarks!: string;
}

export class answers {
  id!: number;
  displayOrder!: number;
  optionImagePath!:string;
  optionImage!: string;
  optionTitle!: string;
  right!: boolean;
}

export class options {
  id!: number;
  displayOrder!: number;
  optionTitle!: string;
  optionImagePath!:string;
  optionImage!: string;
  is_right!: boolean;
}
