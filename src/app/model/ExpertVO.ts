export interface ExpertVO {
    idExpert: number,
    name: string,
    profileImage: string,
    description: string,
}

export interface ExpertRes {
    body: ExpertVO[];
  }