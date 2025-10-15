import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ResponseService } from '../../services/response.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private responseService: ResponseService, private router: Router) { }
  showPassword = true;
  @Output() showSignIn = new EventEmitter<void>();

  createUser = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    surnames: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]),
    dateBirth: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/),] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    rol: new FormControl('usuario', { nonNullable: true })
  }, { validators: this.passwordsDoNotMatch });


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getControl(controlName: string) {
    return this.createUser.get(controlName);
  }

  passwordsDoNotMatch(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }

  onSubmit(): void {
    if (this.createUser.invalid) {
      this.createUser.markAllAsTouched(); // 🔥 fuerza mostrar todos los errores
      return;
    }

    const user = { ...this.createUser.value };    
    delete user.confirmPassword;

    if (user) {
      this.responseService.registerUser(user).subscribe({
        next: (response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Tu cuenta fue creada correctamente',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/login'])
            this.showSignIn.emit();
          }
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          alert(`Error en el registro: ${error.error?.message || 'Verifica los datos e intenta de nuevo'}`);
        },
      });
    }
  }
}
