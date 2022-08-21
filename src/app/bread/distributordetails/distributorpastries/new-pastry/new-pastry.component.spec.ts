import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPastryComponent } from './new-pastry.component';

describe('NewPastryComponent', () => {
  let component: NewPastryComponent;
  let fixture: ComponentFixture<NewPastryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPastryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPastryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
