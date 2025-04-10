import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  @Input() photo: string = "../../../../images/logo.png";

  private fb = inject(FormBuilder);
  showPassword = true;

  signInForm: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/),
        ],
      ],
    },
  );

  togglePassword(): void {
    this.showPassword = !this.showPassword;  // Cambia la visibilidad de la contraseña
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Formulario válido:', this.signInForm.value);
    }
  }
}
