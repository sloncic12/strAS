import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPriceChangeComponent } from './dialog-price-change.component';

describe('DialogPriceChangeComponent', () => {
  let component: DialogPriceChangeComponent;
  let fixture: ComponentFixture<DialogPriceChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPriceChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPriceChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
