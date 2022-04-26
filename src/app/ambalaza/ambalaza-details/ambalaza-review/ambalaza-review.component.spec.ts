import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaReviewComponent } from './ambalaza-review.component';

describe('AmbalazaReviewComponent', () => {
  let component: AmbalazaReviewComponent;
  let fixture: ComponentFixture<AmbalazaReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
