import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ArticleService} from '../service/ArticleService';
import {RouterModule, Routes} from '@angular/router';
import { ArticleComponent } from './article/article.component';
const appRoutes: Routes = [
  { path: 'article', component: ArticleComponent},
  { path: '', redirectTo : '/article',
    pathMatch : 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
