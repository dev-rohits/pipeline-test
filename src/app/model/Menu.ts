export interface Menu {
  moduleSectionId?: number;
  defaultUrl?: any;
  sectionName?: string;
  displayOrder?: number;
  screenUrl?:string;
  iconName?: string;
  moduleSubSectionList?: ModuleSubSectionList[];
}

export interface ModuleSubSectionList {
  moduleSubSectionId: number;
  subSectionName: any;
  displayOrder: number;
  screenUrl: string;
  screenList: ScreenList[];
  defaultUrl: any;
  screenId: number;
  orderNo: number;
}

export interface ScreenList {
  screenNameId: number;
  moduleSubSection: any;
  screenName: string;
  screenUrl: string;
  title: string;
  displayOrder: number;
}
