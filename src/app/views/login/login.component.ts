import { Component } from '@angular/core';
import { SignInComponent } from "../sign-in/sign-in.component";
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [SignInComponent, SignUpComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = true;
  testSignIn = true;

  onSignIn(): void {
    this.testSignIn = true;
  }

  onSignUp(): void {
    this.testSignIn = false;
  }

  onTestSignIn() {
    this.testSignIn = true;
  }

  onShowSignUp() {
    this.testSignIn = false;
  }
}
