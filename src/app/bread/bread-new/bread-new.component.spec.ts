import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadNewComponent } from './bread-new.component';

describe('BreadNewComponent', () => {
  let component: BreadNewComponent;
  let fixture: ComponentFixture<BreadNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadNewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
