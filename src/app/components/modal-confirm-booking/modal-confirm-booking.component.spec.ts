import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmBookingComponent } from './modal-confirm-booking.component';

describe('ModalConfirmBookingComponent', () => {
  let component: ModalConfirmBookingComponent;
  let fixture: ComponentFixture<ModalConfirmBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
