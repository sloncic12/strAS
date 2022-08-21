import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordebtsComponent } from './distributordebts.component';

describe('DistributordebtsComponent', () => {
  let component: DistributordebtsComponent;
  let fixture: ComponentFixture<DistributordebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributordebtsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
