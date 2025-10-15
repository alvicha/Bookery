import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { ContactComponent } from './components/forms/contact/contact.component';
import { ShowInfoBookComponent } from './views/show-info-book/show-info-book.component';
import { ViewAboutComponent } from './components/view-about/view-about.component';
import { BooksComponent } from './views/books/books.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BooksUserComponent } from './views/books-user/books-user.component';
import { RecordComponent } from './views/record/record.component';
import { ShowProfileComponent } from './views/show-profile/show-profile.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'signIn', component: SignInComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'showInfoBook/:id', component: ShowInfoBookComponent },
    { path: 'view-about', component: ViewAboutComponent },
    { path: 'books', component: BooksComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'books-user', component: BooksUserComponent },
    { path: 'historial', component: RecordComponent },
    { path: 'show-profile', component: ShowProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent }
];
