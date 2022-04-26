import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaDetailsComponent } from './ambalaza-details.component';

describe('AmbalazaDetailsComponent', () => {
  let component: AmbalazaDetailsComponent;
  let fixture: ComponentFixture<AmbalazaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
