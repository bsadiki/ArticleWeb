import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Article} from '../model/article';

@Injectable()
export class ArticleService {
  constructor(public http:Http){}
  getArticleByTitle(motCle: string, page: number, size:number){
    return this.http.get('http://localhost:8080/findByTitre?titre='+motCle+'&size='+size+'&page='+page)
      .map(resp => resp.json());
  }
  addArticle(article : Article){
    return this.http.post('http://localhost:8080/addArticle',article).map(resp => resp.json());
  }
}
