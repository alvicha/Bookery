import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { IntroComponent } from './views/intro/intro.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ViewBookComponent } from './components/view-book/view-book.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'intro', component: IntroComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'viewBook', component: ViewBookComponent },
    { path: 'contactForm', component: ContactFormComponent }
]
