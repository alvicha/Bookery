import { Component, Input, OnInit } from '@angular/core';
import { BookInfo } from '../../models/books.interface';
import { Router } from '@angular/router';
import { ResponseService } from '../../services/response.service';
import { UserInfo } from '../../models/users.interface';
import { NgClass } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  public constructor(public service: ResponseService, private router: Router, private searchService: SearchService) { }
  userData?: UserInfo;
  @Input() book!: BookInfo; // el "!" evita error de null
  urlBooksApi: string = "http://localhost:8000/api/showBooks";
  books: BookInfo[] = [];

  ngOnInit(): void {
    const userDataStorage = localStorage.getItem('userData');

    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
    }
  }

  onClickBookSelected() {
    this.router.navigate(['/showInfoBook', this.book.id]);
  }

  onClickFavouriteBook(book: BookInfo): void {
    if (!book.favourite) {
      this.service.addLikeBook(Number(this.userData?.id), book.id).subscribe({
        next: () => book.favourite = true,
        error: (err) => console.error('Error al añadir libro en favoritos:', err)
      });
    } else {
      this.service.deleteLikeBooks(Number(this.userData?.id), book.id).subscribe({
        next: () => book.favourite = false,
        error: (err) => console.error('Error al eliminar libro en favoritos:', err)
      });
    }
  }
} 
