import {Injectable} from "@angular/core";
import {Task} from "./app.task";
import{Observable} from "rxjs/Rx";
import 'rxjs/add/observable/of';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()

export class AppService{

  task: Task[] = [];

  constructor(private http: Http){

  }

  remove(index: string): Observable<any> {
    let jsonHeader = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:9000/remove/' + index, {headers: jsonHeader}).map((response: any) => {
      return this.extractData(response)
    });
  }
  addTask(task: Task): Observable<any> {
    let jsonHeader = new Headers({
      'Content-Type': 'application/json'
    });
    let obj = {
      date: task.date,
      title: task.title,
      description: task.description,
      priority: task.priority
    };
    return this.http.post('http://localhost:9000/add', obj, {headers: jsonHeader})
      .map(data => {
        return this.extractData(data)
      })
      .catch((e: any) => {
        return this.handle(e)
      });
  }

  getData(): Observable<any> {
    alert("here");
    let jsonHeader = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:9000/get/all', {headers: jsonHeader}).map((response: any) => {
      return this.extractData(response)
    });
  }

  updateTask(task: Task): Observable<any> {
    let jsonHeader = new Headers({
      'Content-Type': 'application/json'
    });
    let obj = {
      date: task.date,
      title: task.title,
      description: task.description,
      priority: task.priority,
      _id: task._id
    };
    return this.http.post('http://localhost:9000/update', obj, {headers: jsonHeader})
      .map(data => {
        return this.extractData(data)
      })
      .catch((e: any) => {
        return this.handle(e)
      });
  }


  extractData(res: any) {
    let body = res.json();
    return body;
  }
  private handle(error: any) {
    let errMsg: string;
    try {
      if (JSON.parse(error._body).message) {
        errMsg = JSON.parse(error._body).message
      } else {
        errMsg = 'Some thing went wrong';
      }

    }
    catch (e) {
      errMsg = 'Somthing Went Wrong try again!!'
    }
    return Observable.throw(new Error(errMsg));
  }
}
