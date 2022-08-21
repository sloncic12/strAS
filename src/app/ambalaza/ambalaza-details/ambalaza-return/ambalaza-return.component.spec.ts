import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaReturnComponent } from './ambalaza-return.component';

describe('AmbalazaReturnComponent', () => {
  let component: AmbalazaReturnComponent;
  let fixture: ComponentFixture<AmbalazaReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmbalazaReturnComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
