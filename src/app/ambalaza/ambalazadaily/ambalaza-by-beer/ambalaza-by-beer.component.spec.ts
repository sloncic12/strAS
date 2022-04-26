import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaByBeerComponent } from './ambalaza-by-beer.component';

describe('AmbalazaByBeerComponent', () => {
  let component: AmbalazaByBeerComponent;
  let fixture: ComponentFixture<AmbalazaByBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaByBeerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaByBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
