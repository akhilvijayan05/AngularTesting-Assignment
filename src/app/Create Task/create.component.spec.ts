import {CreateComponent} from "./create.component";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By}           from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { RouterOutletMap} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpModule} from "@angular/http";
import {AppService} from "../app.service";
import { Router, ActivatedRoute} from "@angular/router";

describe('CreateTaskComponent', function () {
  let de: DebugElement;
  let comp: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let service: AppService;
  let router: Router;
  let route:ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [ RouterOutletMap, AppService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    comp = fixture.componentInstance;
    comp.task = {
      date: '1/3/17',
      title: 'Scala',
      description: 'I love scala',
      priority: 'high',
      _id: '123'
    }
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
    route=fixture.debugElement.injector.get(ActivatedRoute);
  });

  it('should create component', () => expect(comp).toBeDefined());


  it('it should be able to update data in case of getting router parameter', () => {
    comp.index = 0;
    spyOn(window,'alert');
    spyOn(service, 'updateTask').and.returnValue(
      Observable.of<any>(
        [{
          date: '1/3/17',
          title: 'Scala',
          description: 'I love scala',
          priority: 'high'
        }]
      )
    );
    comp.submit();
    expect(window.alert).toHaveBeenCalledWith('Task is created');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to generate error in case of data to update', () => {
    comp.index = 0;
    spyOn(console,'error');
    spyOn(service, 'updateTask').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.submit();
    expect(console.error).toHaveBeenCalled();

  });

  it('it should be able to add data in case of router parameter is not present', () => {
    comp.index= null;
    spyOn(window,'alert');
    spyOn(service, 'addTask').and.returnValue(
      Observable.of<any>(
        [{
          date: '1/3/17',
          title: 'Scala',
          description: 'I love scala',
          priority: 'high'
        }]
      )
    );
    comp.submit();
    expect(window.alert).toHaveBeenCalledWith('Task Added');
    router.navigate([]).then(data => {
      expect(data).toBe(true);
    })

  });

  it('it should be able to generate error in case of router parameter is not present', () => {
    comp.index= null;
    spyOn(console,'error');
    spyOn(service, 'addTask').and.returnValue(
      Observable.throw(Error('Observable Error Occurs'))
    );
    comp.submit();
    expect(console.error).toHaveBeenCalled();

  });

});
