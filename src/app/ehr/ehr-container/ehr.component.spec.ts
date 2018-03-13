import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EHRComponent } from './ehr.component';

describe('EHRComponent', () => {
  let component: EHRComponent;
  let fixture: ComponentFixture<EHRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EHRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
