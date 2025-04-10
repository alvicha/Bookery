import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  @Input() photo: string = "../../../../images/logo.png";

  private fb = inject(FormBuilder);

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

  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Formulario válido:', this.signInForm.value);
    }
  }
}
