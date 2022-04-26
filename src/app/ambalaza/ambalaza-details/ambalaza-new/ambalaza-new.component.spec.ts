import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbalazaNewComponent } from './ambalaza-new.component';

describe('AmbalazaNewComponent', () => {
  let component: AmbalazaNewComponent;
  let fixture: ComponentFixture<AmbalazaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbalazaNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbalazaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
