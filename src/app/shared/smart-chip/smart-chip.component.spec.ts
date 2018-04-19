import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartChipComponent } from './smart-chip.component';

describe('SmartChipComponent', () => {
  let component: SmartChipComponent;
  let fixture: ComponentFixture<SmartChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
