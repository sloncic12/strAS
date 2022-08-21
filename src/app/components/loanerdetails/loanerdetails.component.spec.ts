import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanerdetailsComponent } from './loanerdetails.component';

describe('LoanerdetailsComponent', () => {
  let component: LoanerdetailsComponent;
  let fixture: ComponentFixture<LoanerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanerdetailsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
