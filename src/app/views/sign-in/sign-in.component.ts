import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseService } from '../../services/response.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private responseService: ResponseService, private router: Router) { }
  showPassword = true;
  @Output() showSignUp = new EventEmitter<void>();

  signInForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;  // Cambia la visibilidad de la contraseña
  }

  getControl(controlName: string) {
    return this.signInForm.get(controlName);
  }

  onSignUp(): void {
    this.showSignUp.emit();
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const credentials = {
        email: this.signInForm.getRawValue().email,
        password: this.signInForm.getRawValue().password
      };

      this.responseService.signInUser(credentials).subscribe({
        next: (userResponse) => {
          if (userResponse) {
            localStorage.setItem('userType', userResponse.rol);
            localStorage.setItem('userData', JSON.stringify(userResponse));
            window.dispatchEvent(new Event("storage"));

            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión',
              text: 'Has iniciado sesión con tu cuenta con éxito',
              confirmButtonText: 'Aceptar'
            });

            switch (userResponse.rol) {
              case 'usuario':
                this.router.navigate(['/books']);
                break;
            }
          }
        },
        error: (error) => {
          console.error('🚨 Error en el login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión fallido',
            text: 'Correo electrónico o contraseña incorrectos',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Object.keys(this.signInForm.controls).forEach(key => {
        const control = this.signInForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
