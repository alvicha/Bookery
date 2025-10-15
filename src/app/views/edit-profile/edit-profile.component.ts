import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/users.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseService } from '../../services/response.service';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit {
  constructor(public service: ResponseService, private router: Router) { }
  userData: UserInfo | undefined;
  loading = false;
  showPassword = true;

  editProfile = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    apellidos: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]),
    fecha_nacimiento: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);

      if (this.userData) {
        const date = new Date(this.userData.fecha_nacimiento.date);

        this.editProfile.patchValue({
          nombre: this.userData.nombre,
          apellidos: this.userData.apellidos,
          email: this.userData.email,
          telefono: this.userData.telefono,
          fecha_nacimiento: date.toISOString().substring(0, 10) // 'YYYY-MM-DD'
        });
      }
    } else {
      this.router.navigate(['/showProfile']);
    }
  }

  getControl(controlName: string) {
    return this.editProfile.get(controlName);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  saveChangesProfile(): void {
    if (this.editProfile.invalid) {
      this.editProfile.markAllAsTouched(); // 🔥 fuerza mostrar todos los errores
      return;
    }

    this.loading = true;

    if (!this.userData) {
      console.error('No hay datos del usuario cargados');
      this.loading = false;
      return;
    }

    const raw = this.editProfile.getRawValue();
    const payloadUser: UserInfo = {
      id: this.userData!.id!,
      nombre: raw.nombre!,
      apellidos: raw.apellidos!,
      email: raw.email!,
      telefono: raw.telefono!,
      fecha_nacimiento: {
        date: new Date(raw.fecha_nacimiento),
        timezone_type: 3,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      password: this.userData!.password!,
      rol: this.userData!.rol!
    };

    const body = {
      ...this.editProfile.value
    };

    this.service.updateUser(Number(this.userData.id), body).subscribe({
      next: (response) => {

        if (response) {
          this.userData = payloadUser;
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.loading = false;

          this.router.navigate(['/show-profile']).then(() => {
            window.location.reload();
          });
        }
      },
      error: (err) => {
        console.error('Error al actualizar el usuario', err);
        this.loading = false;
      }
    });

    localStorage.setItem('userData', JSON.stringify(this.userData));
    this.loading = false;
  }

  cancelChanges(): void {
    this.router.navigate(['/show-profile']);
  }

}
