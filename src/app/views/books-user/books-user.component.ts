import { Component, OnInit } from '@angular/core';
import { BookInfo } from '../../models/books.interface';
import { ResponseService } from '../../services/response.service';
import { UserInfo } from '../../models/users.interface';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Booking } from '../../models/bookings.interface';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-books-user',
  imports: [CarouselModule, ButtonModule, NgClass, TableModule, TagModule],
  standalone: true,
  templateUrl: './books-user.component.html',
  styleUrl: './books-user.component.css'
})

export class BooksUserComponent implements OnInit {
  public constructor(public service: ResponseService, private router: Router) { }
  booksUser: BookInfo[] = [];
  userData?: UserInfo;
  responsiveOptions: any[] | undefined;
  urlBooksUser: string = "http://localhost:8000/api/getBooksUser";
  urlGetConfirmBookings: string = "http://localhost:8000/api/showBookingsByUser";
  testShowScreens: boolean = false;
  bookings: Booking[] = [];
  activeTab = 0;
  dateString: string = "";
  favouriteBooks: BookInfo[] = [];

  tabs = [
    { value: 0, label: 'Mis pedidos', icon: 'bi bi-bag' },
    { value: 1, label: 'Mis reservas', icon: 'bi bi-bookmarks' },
    { value: 2, label: 'Favoritos', icon: 'bi bi-heart' },
    { value: 3, label: 'Eliminados', icon: 'bi bi-trash' },
  ];

  ngOnInit(): void {
    const userDataStorage = localStorage.getItem('userData');
    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
    }
    this.listBooksApi();
    this.showAllBookings();
    this.listFavouriteBooks();

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  listBooksApi(): void {
    this.service.getResponseBooks(`${this.urlBooksUser}/${this.userData?.id}`).subscribe((response) => {
      this.booksUser = response.books;
    })
  }

  showAllBookings(): void {
    this.service.getResponseBooks(`${this.urlGetConfirmBookings}/${this.userData?.id}`).subscribe((response) => {
      this.bookings = response.bookings.map((booking: any) => {
        const fecha = new Date(booking.fecha);
        return {
          ...booking,
          fechaString: fecha.toLocaleDateString('es-ES')
        };
      });
    })
  }

  onShowBookSelected(idBook: number): void {
    this.router.navigate(['/showInfoBook', idBook]);
  }

  listFavouriteBooks(): void {
    this.service.getLikeBooks(Number(this.userData?.id)).subscribe((response) => {
      this.favouriteBooks = response.favourites;
    });
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'confirmada':
        return 'success';
      default:
        return 'info';
    }
  }
}
