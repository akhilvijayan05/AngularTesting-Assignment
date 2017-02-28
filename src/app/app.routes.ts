import {Routes} from '@angular/router'
import {ShowComponent} from "./ShowTask/show.component";
import {CreateComponent} from "./Create Task/create.component";
import {HomeComponent} from "./Home/home.component";


export const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'show',
  component: ShowComponent
},{
  path : 'create/:indexSent',
  component: CreateComponent
},{
  path: 'create',
  component: CreateComponent
}];
