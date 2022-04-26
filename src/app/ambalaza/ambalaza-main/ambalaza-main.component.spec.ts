import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaMainComponent } from './ambalaza-main.component';

describe('AmbalazaMainComponent', () => {
  let component: AmbalazaMainComponent;
  let fixture: ComponentFixture<AmbalazaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
