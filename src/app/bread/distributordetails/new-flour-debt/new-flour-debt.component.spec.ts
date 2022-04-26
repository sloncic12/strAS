import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFlourDebtComponent } from './new-flour-debt.component';

describe('NewFlourDebtComponent', () => {
  let component: NewFlourDebtComponent;
  let fixture: ComponentFixture<NewFlourDebtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFlourDebtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFlourDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
