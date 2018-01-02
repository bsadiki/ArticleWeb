///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../service/ArticleService';
import {Article} from '../../model/article';
import {  HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article = new Article(null, null, null, null, null);
  pageArticle: Array<Article>;
  motCle: string = '';
  currentpage: number = 0;
  size: number = 5;
  pages: Array<number>;
  base64textString: string;

  constructor(public articleService: ArticleService) {
  }

  ngOnInit() {
  }

  chercher() {
    this.articleService.getArticleByTitle(this.motCle, this.currentpage, this.size)
      .subscribe(data => {
        this.pageArticle = data.content;
        this.pages = data.totalPages;
        for (let i = 0; i < this.pageArticle.length; i++) {
          this.pageArticle[i].photo = 'data:image/png;base64,' + this.pageArticle[i].photo;
        }
        console.log(this.pageArticle);
      });
  }


  onEditArticle(articleId) {

  }

  onDeleteArticle(articleId) {

  }

  saveArticle() {
    this.article.photo = this.base64textString;
    this.articleService.addArticle(this.article).subscribe(data => {
      this.article = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
}
