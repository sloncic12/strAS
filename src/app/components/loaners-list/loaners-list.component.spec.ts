import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanersListComponent } from './loaners-list.component';

describe('LoanersListComponent', () => {
  let component: LoanersListComponent;
  let fixture: ComponentFixture<LoanersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanersListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
