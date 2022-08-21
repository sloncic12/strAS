import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorpastriesComponent } from './distributorpastries.component';

describe('DistributorpastriesComponent', () => {
  let component: DistributorpastriesComponent;
  let fixture: ComponentFixture<DistributorpastriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributorpastriesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorpastriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
