import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<div class="container-fluid  color">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/">TODO</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a class="active" routerLink="/show">Show Task</a></li>
          <li><a routerLink="/create">Create Task</a></li>
        </ul>
      </div>
    </nav>
  </div><br><br><br>
<router-outlet></router-outlet>`,
})
export class AppComponent  { }
