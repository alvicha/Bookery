import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public http: HttpClient) { }

  private searchTextSource = new BehaviorSubject<string>('');
  currentSearchText = this.searchTextSource.asObservable();
  private books = new BehaviorSubject<any[]>([]);
  currentBooks = this.books.asObservable();

  private bookAddedMap = new BehaviorSubject<{ [bookId: number]: boolean }>({});
  currentBookAdded = this.bookAddedMap.asObservable();

  urlGetPendingBooksCart: string = "http://localhost:8000/api/getPendingBooks";
  urlCreateBooking: string = "http://localhost:8000/api/createBooking";
  urlDeleteBookCart: string = "http://localhost:8000/api/deleteBookFromCart";
  urlUpdateBooking: string = "http://localhost:8000/api/updateBooking";

  // función para actualizar el valor del BehaviorSubject 
  setSearchText(text: string) {
    this.searchTextSource.next(text);
  }

  setBookAdded(bookId: number, value: boolean) {
    const currentMap = this.bookAddedMap.getValue(); // obtenemos el estado actual
    this.bookAddedMap.next({ ...currentMap, [bookId]: value }); // actualizamos solo ese libro
  }

  getCart(userId: number): void {
    this.http.get<any>(`${this.urlGetPendingBooksCart}/${userId}`)
      .subscribe({
        next: res => this.books.next(res.books),
        error: err => console.error('Error cargando carrito:', err)
      });
  }

  addToCart(userId: number, bookId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.post(`${this.urlCreateBooking}`, { userId, bookId }, { headers }).subscribe({
      next: () => this.getCart(userId),
      error: err => console.error('Error añadiendo libro al carrito:', err)
    });
  }

  deleteBookToCart(userId: number, bookId: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    this.http.delete(`${this.urlDeleteBookCart}/${userId}/${bookId}`, { headers })
      .subscribe({
        next: () => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Libro eliminado de la cesta",
            icon: "success",
            confirmButtonText: 'Aceptar'
          });
          this.getCart(userId);
        },
        error: err => {
          console.error('Error eliminando libro del carrito:', err);
          Swal.fire({
            icon: 'error',
            title: 'Eliminación fallida',
            text: `No se ha podido eliminar el libro de la cesta. ${err.error?.message || ''}`,
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }

  updateBooking(idUser: number, payload: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.patch(`${this.urlUpdateBooking}/${idUser}`, payload, { headers })
      .subscribe({
        next: () => {
          Swal.fire({
            title: "Reserva Confirmada",
            text: "Reserva confirmada y realizada con éxito. Lo podrás recoger en el local.",
            icon: "success",
            confirmButtonText: 'Aceptar'
          });
          this.getCart(idUser);
        },
        error: err => {
          console.error('Error al actualizar la reserva:', err);
          alert(`Error en la actualización: ${err.error?.message || 'Verifica los datos e intenta de nuevo'}`);
          Swal.fire({
            icon: 'error',
            title: 'Reserva fallida',
            text: 'No se ha podido realizar la reserva',
            confirmButtonText: 'Aceptar'

          });
        }
      });
  }
}