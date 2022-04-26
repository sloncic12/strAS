import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDebtsComponent } from './review-debts.component';

describe('ReviewDebtsComponent', () => {
  let component: ReviewDebtsComponent;
  let fixture: ComponentFixture<ReviewDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDebtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
