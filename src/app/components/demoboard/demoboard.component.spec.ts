import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoboardComponent } from './demoboard.component';

describe('DemoboardComponent', () => {
  let component: DemoboardComponent;
  let fixture: ComponentFixture<DemoboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
