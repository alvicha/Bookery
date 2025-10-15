import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserInfo } from '../../models/users.interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ResponseService } from '../../services/response.service';
import Swal from 'sweetalert2';
import { ModalConfirmBookingComponent } from "../modal-confirm-booking/modal-confirm-booking.component";
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink, RouterLinkActive, SearchBarComponent, ModalConfirmBookingComponent],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  constructor(public service: ResponseService, private searchService: SearchService, private router: Router) { }
  userData?: UserInfo;
  books: any[] = [];
  totalBooks: number = 0;
  countBook: number = 0;
  totalPrice: number = 0;
  modal: string = "modal";
  subtotal: number = 0;

  ngOnInit() {
    const userDataStorage = localStorage.getItem('userData');
    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
    }

    this.showBooksShop();
  }

  showBooksShop(): void {
    this.searchService.getCart(Number(this.userData?.id));

    this.searchService.currentBooks.subscribe((books: any) => {
      this.books = books.map((book: any) => ({
        ...book,
        count: 1
      }));
      this.updateTotals();
    })
  }

  validateNumBooks(selectedBook: any, option: number): void {
    if (option === 1 && selectedBook.count > 1) {
      selectedBook.count -= 1;
    } else if (option >= 2) {
      selectedBook.count += 1
    }

    this.updateTotals();
  }

  updateTotals(): void {
    this.totalBooks = this.books.reduce((acc, book) =>
      acc + book.count,
      0);

    this.subtotal = parseFloat(this.books.reduce((acc, book) => acc + (book.precio * book.count), 0).toFixed(2));

    this.totalPrice = this.subtotal;
  }

  deleteBookShop(idBook: number): void {
    Swal.fire({
      title: "Eliminar libro cesta",
      text: "¿Estás seguro que desea eliminar este libro de la cesta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.searchService.deleteBookToCart(Number(this.userData?.id), idBook);
      }
    });
  }

  onConfirmBooking(): void {
    this.modal = "modal show-modal";
  }

  onLogout(): void {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.setItem('userType', 'invitado');

    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  onClose(): void {
    this.modal = 'modal';
  }
}
