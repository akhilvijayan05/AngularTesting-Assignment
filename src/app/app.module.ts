import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {ShowComponent} from "./ShowTask/show.component";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {AppService} from "./app.service";
import {CreateComponent} from "./Create Task/create.component";
import {HomeComponent} from "./Home/home.component";
import {FormsModule} from "@angular/forms";
@NgModule({
  imports:      [ BrowserModule , RouterModule.forRoot(routes),FormsModule,HttpModule],
  declarations: [ AppComponent , ShowComponent,CreateComponent,HomeComponent],
  bootstrap:    [ AppComponent ],
  providers: [AppService]
})
export class AppModule { }
