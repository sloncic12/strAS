import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazadailyComponent } from './ambalazadaily.component';

describe('AmbalazadailyComponent', () => {
  let component: AmbalazadailyComponent;
  let fixture: ComponentFixture<AmbalazadailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazadailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazadailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
