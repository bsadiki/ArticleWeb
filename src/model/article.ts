export class Article{

  constructor(public id: number,public titre: string,public description: string,public selected : boolean,public photo:string){
    this.photo = 'data:image/png;base64,' + photo;
  }
}
