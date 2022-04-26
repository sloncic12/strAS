import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDebtComponent } from './return-debt.component';

describe('ReturnDebtComponent', () => {
  let component: ReturnDebtComponent;
  let fixture: ComponentFixture<ReturnDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
