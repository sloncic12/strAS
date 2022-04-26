import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadReturnedComponent } from './bread-returned.component';

describe('BreadReturnedComponent', () => {
  let component: BreadReturnedComponent;
  let fixture: ComponentFixture<BreadReturnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadReturnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
