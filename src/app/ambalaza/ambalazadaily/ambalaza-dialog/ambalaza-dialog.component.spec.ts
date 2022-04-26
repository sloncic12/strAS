import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaDialogComponent } from './ambalaza-dialog.component';

describe('AmbalazaDialogComponent', () => {
  let component: AmbalazaDialogComponent;
  let fixture: ComponentFixture<AmbalazaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
