import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoslideshowComponent } from './demoslideshow.component';

describe('DemoslideshowComponent', () => {
  let component: DemoslideshowComponent;
  let fixture: ComponentFixture<DemoslideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoslideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoslideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
