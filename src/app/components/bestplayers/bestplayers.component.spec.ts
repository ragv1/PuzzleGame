import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestplayersComponent } from './bestplayers.component';

describe('BestplayersComponent', () => {
  let component: BestplayersComponent;
  let fixture: ComponentFixture<BestplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestplayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
