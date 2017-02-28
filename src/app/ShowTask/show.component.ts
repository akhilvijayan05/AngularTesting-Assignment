import {Component} from '@angular/core';
import {AppService} from "../app.service";
import {Task} from "../app.task";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'show',
  template: `<h1>These are your tasks</h1>
<p *ngFor="let task of tasks;let index = index">
  <label>Date: </label>{{task.date}}<br>
  <label>Title: </label>{{task.title}}<br>
  <label>Description: </label>{{task.description}}<br>
  <label>Priority: </label>{{task.priority}}<br>
  <label>_Id: </label>{{task._id}}
  <br>
<input type="button" value="Edit" (click)="editTask(index)">
<input type="button" value="Done" (click)="deleteByIndex(index)">`,
})
export class ShowComponent {
  tasks: Task[];
http:Http;
  constructor(private router: Router,private service: AppService) { }
  public ngOnInit(): any {
    this.service.getData().subscribe((data: any) => {
        this.tasks = data
        alert(JSON.stringify(data))
      },
      (err: any) => alert(err), () => {
        alert('Success')
      });
  }
  deleteByIndex(index: number) {

    this.service.remove(this.tasks[index]._id).subscribe()//(data: any) => alert(JSON.stringify(data)))
    alert('Task Removed')
    this.router.navigate(['create'])
  }


  editTask(index: number) {

    this.router.navigate(['create', index])
  }

}
