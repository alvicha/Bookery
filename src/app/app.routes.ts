import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IntroComponent } from './views/intro/intro.component';
import { SignInComponent } from './views/sign-in/sign-in.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signIn', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'intro', component: IntroComponent },
    { path: 'signIn', component: SignInComponent },
];
