import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderUserComponent, HeaderAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'bookery';
  isUserRol: string | null = null;

  updateuserRol(): void {
    const userRol = localStorage.getItem('userType');
    this.isUserRol = userRol;

    if (!this.isUserRol) {
      this.isUserRol = "invitado";
    } else {
      this.isUserRol = userRol;
    }
  }

  ngOnInit() {
    this.updateuserRol();

    window.addEventListener("storage", () => {
      this.updateuserRol();
    });
  }


}
