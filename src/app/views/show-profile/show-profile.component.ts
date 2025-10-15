import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../models/users.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  imports: [],
  templateUrl: './show-profile.component.html',
  styleUrl: './show-profile.component.css'
})
export class ShowProfileComponent implements OnInit {
  constructor(private router: Router) { }
  userData?: UserInfo;
  dateString: string = "";

  ngOnInit() {
    const userDataStorage = localStorage.getItem('userData');

    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
      const dateISO = this.userData?.fecha_nacimiento?.date;

      if (dateISO) {
        const fecha = new Date(dateISO);
        this.dateString = fecha.toLocaleDateString('es-ES');
      }
    }
  }

  onLogout() {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');

    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  onEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

}
