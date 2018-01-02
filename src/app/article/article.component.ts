import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../../service/ArticleService';
import {Article} from '../../model/article';
declare var $:any;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  mode: number = 0;
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
    this.chercher();
  }

  chercher() {
    this.articleService.getArticleByTitle(this.motCle, this.currentpage, this.size)
      .subscribe(data => {
        this.pageArticle = data.content;
        this.pages=new Array(data.totalPages);
        for (let i = 0; i < this.pageArticle.length; i++) {
          this.pageArticle[i].photo = 'data:image/png;base64,' + this.pageArticle[i].photo;
        }
        console.log(this.pageArticle);
      });
  }

  onNewArticle() {
    this.article = new Article(null, null, null, null, null);
    this.mode = 0;
  }

  onEditArticle(article) {
    this.article = article;
  }

  onDeleteArticle(article: Article) {
    let confirm = window.confirm('Etes vous sure?');
    if (confirm) {
      this.articleService.deleteArticle(article.id)
        .subscribe(data => {
          alert('Suppression effectuée');
          this.pageArticle.splice(this.pageArticle.indexOf(article), 1
          );
        }, err => {
          console.log(err);
        });
    }
  }

  saveArticle() {
    this.article.photo = this.base64textString;
    this.articleService.addArticle(this.article).subscribe(next => {
      this.article = next;
      console.log(next);
      alert('Ajout effectuée');
    }, err => {
      console.log(err);
      alert(err);
    },()=>{
      $('#myModal').modal('hide');
    }    );
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
  gotoPage(i: number){
    this.currentpage = i;
    this.chercher();
  }
}
