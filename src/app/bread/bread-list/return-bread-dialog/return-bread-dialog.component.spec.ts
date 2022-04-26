import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBreadDialogComponent } from './return-bread-dialog.component';

describe('ReturnBreadDialogComponent', () => {
  let component: ReturnBreadDialogComponent;
  let fixture: ComponentFixture<ReturnBreadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnBreadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
