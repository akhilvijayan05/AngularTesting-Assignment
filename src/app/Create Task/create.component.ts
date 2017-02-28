import {Component} from '@angular/core';
import {AppService} from "../app.service";
import {Task} from "../app.task";
import {ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: '',
  template: `<h1>Create your Task</h1><br>
<form (ngSubmit)="submit()">
  <label>Date: </label><input type="text" class="form-control"  [(ngModel)]="task.date" name="date" #date="ngModel">
  <label>Title: </label><input type="text" class="form-control" [(ngModel)]="task.title" name="title" #title="ngModel">
  <label>Description: </label><input type="text" class="form-control" [(ngModel)]="task.description" name="description" #description="ngModel"  >
  <label>Priority: </label><br><select [(ngModel)]="task.priority" name="priority" #priority="ngModel"  >
  <option value="high">High</option>
  <option value="medium">Medium</option>
  <option value="low">Low</option>
</select><br><br>
  <button type="submit">Submit</button>
</form>`,
  providers: [AppService]
})
export class CreateComponent {
  index: number;

  task: Task = new Task('', '', '', '', '');

  constructor(private service: AppService, private route: ActivatedRoute, private router: Router) {
  }

  submit() {
    if (this.index || this.index === 0) {
      this.service.updateTask(this.task).subscribe()//(data: any) => alert(JSON.stringify(data)))
    } else {
      this.service.addTask(this.task).subscribe()//(data: any) => alert(JSON.stringify(data)))
    }

    alert("Task is created");
  }

  public ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.index = +data.indexSent;
      if (this.index || this.index === 0) {

        this.service.getData().subscribe((data: any) => {
            this.task = data[this.index]

          },
          (err: any) => alert(err), () => {
            alert('Success')
          });
      }
    });
  }
}
