import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDebtComponent } from './daily-debt.component';

describe('DailyDebtComponent', () => {
  let component: DailyDebtComponent;
  let fixture: ComponentFixture<DailyDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
