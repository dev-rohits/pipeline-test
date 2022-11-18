export interface BlogsVO {
    
        idBlog: number,
        subject: string,
        image: string,
        description: string,
        isFeatured: boolean,
        displayOrder: number,
        createdDate:Date,
        updatedDate: Date,
        idUser: number,
        firstName:string,
        lastName:string,
        userImage:string,    
}

export interface BlogsRes {
    body: BlogsVO[];
  }