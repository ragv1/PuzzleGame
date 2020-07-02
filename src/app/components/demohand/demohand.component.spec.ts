import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemohandComponent } from './demohand.component';

describe('DemohandComponent', () => {
  let component: DemohandComponent;
  let fixture: ComponentFixture<DemohandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemohandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemohandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
