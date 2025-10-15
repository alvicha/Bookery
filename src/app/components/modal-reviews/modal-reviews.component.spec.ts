import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewsComponent } from './modal-reviews.component';

describe('ModalReviewsComponent', () => {
  let component: ModalReviewsComponent;
  let fixture: ComponentFixture<ModalReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
