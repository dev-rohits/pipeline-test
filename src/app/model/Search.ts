export interface Search {
  id: number;
  name: string;
  description?: any;
  type: string;
}

export interface searchResult{
  institution:Search[];
  courses:Search[];
  teachers:Search[];
}

