import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';
import { Books } from '../models/books.interface';
import { UserInfo, Users } from '../models/users.interface';

@Injectable({
  providedIn: 'root'
})

export class ResponseService {
  constructor(public http: HttpClient) { }
  urlFilterBooks: string = "http://localhost:8000/api/filterInfoBooks";
  urlSignUpUsers: string = "http://localhost:8000/api/createUser";
  urlSignInUsers: string = "http://localhost:8000/api/signIn";
  urlGetUsersByEmail: string = "http://localhost:8000/api/getUsersEmail";
  urlUpdateUsers: string = "http://localhost:8000/api/updateUsers";
  urlCreateReview: string = "http://localhost:8000/api/createReview";
  urlGetReviewsByBook: string = "http://localhost:8000/api/getReviewsByBook";
  urlCreateRecord: string = "http://localhost:8000/api/createRecord";
  urlGetRecordByUser: string = "http://localhost:8000/api/getRecordByUser";
  urlLikeBook: string = "http://localhost:8000/api/like/createLike";
  urlGetLikeBooks: string = "http://localhost:8000/api/like/getFavourites";

  getResponseBooks(url: string): Observable<any> {
    return this.http.get<Books>(url);
  }

  getAllConfirmBookings(url: string): Observable<any> {
    return this.http.get<Books>(url);
  }

  filterInfoBook(data: string): Observable<any> {
    const payload = {
      search: data
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Books>(this.urlFilterBooks, payload, { headers });
  }

  getUsersByEmail(url: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.get<UserInfo>(url, { headers });
  }

  registerUser(userData: any): Observable<UserInfo> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const userDataToSend: UserInfo = {
      nombre: userData.name,
      apellidos: userData.surnames,
      email: userData.email,
      fecha_nacimiento: userData.dateBirth,
      password: userData.password,
      telefono: userData.phone,
      rol: userData.rol
    };

    return this.http.post<UserInfo>(this.urlSignUpUsers, userDataToSend, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error en registro:', error);
        return throwError(() => new Error(error.error?.message || 'Error en el registro del usuario.'));
      })
    );
  }

  signInUser(credentials: { email: string; password: string }): Observable<any> {
    if (!credentials.email || !credentials.password) {
      console.error(" ERROR: El email o la contraseña están vacíos");
      return throwError(() => new Error("El email y la contraseña son obligatorios."));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const dataCredentials = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post<any>(`${this.urlSignInUsers}`, dataCredentials, { headers }).pipe(
      mergeMap(authResponse => {
        if (!authResponse.success) {
          return throwError(() => new Error('Error en la autenticación'));
        }

        return this.getUsersByEmail(`${this.urlGetUsersByEmail}?email=${credentials.email}`).pipe(
          tap(userResponse => {
            if (userResponse.id) {
              localStorage.setItem('userId', userResponse.id.toString());
            }
          })
        );
      }),
      catchError((error) => {
        console.error(' Error en el inicio de sesión:', error);
        return throwError(() => new Error(error.error?.error || 'Error en el servidor, intente nuevamente.'));
      })
    );
  }

  updateUser(idUser: number, user: any): Observable<Users> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.patch<Users>(`${this.urlUpdateUsers}/${idUser}`, user, { headers });
  }

  addReview(reviewData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(this.urlCreateReview, reviewData, { headers }).pipe(
      catchError((error: any) => {
        console.error('Mensaje de error:', error);
        return throwError(() => new Error(error.error?.message || 'Error en la creación de valoración.'));
      })
    );
  }

  getReviewsByBook(idBook: number): Observable<any> {
    return this.http.get<Books>(`${this.urlGetReviewsByBook}/${idBook}`);
  }

  addBookToRecord(idUser: number, idBook: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const payload = {
      idUser: idUser,
      idBook: idBook,
      dateRecord: new Date().toISOString().split('T')[0]
    }

    return this.http.post<any>(this.urlCreateRecord, payload, { headers }).pipe(
      catchError((error: any) => {
        console.error('Mensaje de error:', error);
        return throwError(() => new Error(error.error?.message || 'Error en la inserción del libro en el historial.'));
      })
    );
  }

  getRecordByUser(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.urlGetRecordByUser}/${idUser}`);
  }

  addLikeBook(idUser: number, idBook: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const payload = {
      idUser: idUser,
      idBook: idBook,
      dateFavorite: new Date().toISOString().split('T')[0]
    }

    return this.http.post<any>(this.urlLikeBook, payload, { headers }).pipe(
      catchError((error: any) => {
        console.error('Mensaje de error:', error);
        return throwError(() => new Error(error.error?.message || 'Error para añadir libro en favorito.'));
      })
    );
  }

  getLikeBooks(idUser: number): Observable<any> {
    return this.http.get<any>(`${this.urlGetLikeBooks}/${idUser}`);
  }

}