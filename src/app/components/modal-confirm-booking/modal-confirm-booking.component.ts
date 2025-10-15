import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseService } from '../../services/response.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/users.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-modal-confirm-booking',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './modal-confirm-booking.component.html',
  styleUrl: './modal-confirm-booking.component.css'
})
export class ModalConfirmBookingComponent {
  constructor(public service: ResponseService, private searchService: SearchService, private router: Router) { }
  @Input() userData?: UserInfo;
  @Input() modal: string = 'modal';
  @Input() books: any[] = [];
  @Output() closeModal = new EventEmitter<void>();

  confirmBookingForm = new FormGroup({
    dateBooking: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    time: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  getControl(controlName: string) {
    return this.confirmBookingForm.get(controlName);
  }

  onSubmit(): void {
    if (this.confirmBookingForm.invalid) {
      this.confirmBookingForm.markAllAsTouched();
      return;
    }

    const bodyConfirmBooking = {
      fechaReserva: this.confirmBookingForm.getRawValue().dateBooking,
      horaReserva: this.confirmBookingForm.getRawValue().time,
      estado: 'confirmada'
    };

    this.searchService.updateBooking(Number(this.userData?.id), bodyConfirmBooking);
    this.closeModal.emit();
  }

  onClose(): void {
    this.closeModal.emit();
  }
}