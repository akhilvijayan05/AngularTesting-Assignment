import {ShowComponent} from "./show.component";
import {RouterOutletMap, Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {By}           from '@angular/platform-browser';
import {DebugElement} from "@angular/core";
import {AppService} from "../app.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

describe('ShowComponent', function () {
  let de: DebugElement;
  let comp: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
    navigate():Promise<boolean>{
      return Promise.resolve(true)
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent],
      providers: [{provide: Router, useClass: MockRouter}, RouterOutletMap, AppService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    comp = fixture.componentInstance;
    comp.tasks = [{
      date: '28/02/2017',
      title: 'Gym',
      description: 'Work Out Daily ',
      priority: 'high',
      _id: '12345678'
    }]
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined());


  it('it should be able to get data from service', () => {
    spyOn(service, 'getData').and.returnValue(
      Observable.of<any>(
        [{
          date: '28/02/2017',
          title: 'Akhil',
          description: 'I love scala',
          priority: 'high',
          _id: '12345'
        }]
      )
    );
    comp.ngOnInit();
    expect(comp.tasks).toEqual([{
      date: '28/02/2017',
      title: 'Akhil',
      description: 'I love scala',
      priority: 'high',
      _id: '12345'
    }])
  });

  it('it should be able to generate error in case of error for ngOnInit', () => {
    spyOn(console, 'error');
    spyOn(service, 'getData').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.ngOnInit();
    expect(console.error).toHaveBeenCalledWith(Error('Observable Error Occurs'));
  });

  it('it should be able to delete data from service',() =>{
    spyOn(window, "alert");
    spyOn(service,'remove').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.deleteByIndex(0);
    expect(window.alert).toHaveBeenCalledWith('Task Removed');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to generate error in case of error for deleting task', () => {
    spyOn(console, 'error');
    spyOn(service, 'remove').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.deleteByIndex(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('it should be able to edit data from service',() =>{
    spyOn(service,'remove').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.editTask(0);
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });


});
