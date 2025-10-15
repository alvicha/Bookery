import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ResponseService } from '../../services/response.service';
import { UserInfo } from '../../models/users.interface';
import Swal from 'sweetalert2';
import { BookInfo } from '../../models/books.interface';

@Component({
  selector: 'app-modal-reviews',
  imports: [ReactiveFormsModule, NgClass, RatingModule],
  standalone: true,
  templateUrl: './modal-reviews.component.html',
  styleUrl: './modal-reviews.component.css'
})

export class ModalReviewsComponent {
  constructor(private responseService: ResponseService) { }
  @Input() modalReviews: string = 'modal';
  @Input() book!: BookInfo;
  userData?: UserInfo;
  @Output() closeModal = new EventEmitter<void>();

  opinionForm = new FormGroup({
    rating: new FormControl<number | null>(null, { validators: [Validators.required] }),
    comment: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    const userDataStorage = localStorage.getItem('userData');
    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
    }
  }

  getControl(controlName: string) {
    return this.opinionForm.get(controlName);
  }

  isInvalid(controlName: string) {
    const control = this.opinionForm.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.opinionForm.invalid) {
      this.opinionForm.markAllAsTouched(); // 🔥 fuerza mostrar todos los errores
      return;
    }

    const payload = {
      date: new Date().toISOString().split('T')[0],
      rating: this.opinionForm.getRawValue().rating,
      comment: this.opinionForm.getRawValue().comment,
      idBook: this.book.id,
      idUser: this.userData?.id
    };

    this.responseService.addReview(payload).subscribe({
      next: (response) => {
        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Valoración añadida',
            text: 'Tu opinión ha sido añadida con éxito',
            confirmButtonText: 'Aceptar'
          });
          this.onClose();
        }
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        alert(`Error en el registro: ${error.error?.message || 'Verifica los datos e intenta de nuevo'}`);
      },
    });
  }

  onClose(): void {
    this.closeModal.emit();
  }

}
