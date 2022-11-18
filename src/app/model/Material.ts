export interface MaterialFetch {
    idClassMaterial: number;
    idTeacher: number;
    materialType: string;
    materialCategory?: any;
    materialName: string;
    materialFileName: string;
    materialTopic: string;
    materialDescription: string;
    materialFilePath: string;
    createdDate?: Date;
    mappingList: any[];
}

export interface ClassFetch {
    idClassSchedule: number;
    idInstitution: number;
    idTeacher: number;
    startDate: Date;
    endDate: Date;
    classTitle: string;
    classDescription: string;
    classSubject: string;
    createdDate?: Date;
    mappingList: any[];
}

export interface FetchClassAndMaterialResult {
    material: MaterialFetch[];
    classes: ClassFetch[];
    materialCount: number;
}

export interface FetchClassAndMaterial {
    data: FetchClassAndMaterialResult;
}