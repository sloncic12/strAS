import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorbreadreviewComponent } from './distributorbreadreview.component';

describe('DistributorbreadreviewComponent', () => {
  let component: DistributorbreadreviewComponent;
  let fixture: ComponentFixture<DistributorbreadreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistributorbreadreviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorbreadreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
