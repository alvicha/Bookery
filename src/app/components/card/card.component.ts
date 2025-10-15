import { Component, Input, OnInit } from '@angular/core';
import { BookInfo } from '../../models/books.interface';
import { Router } from '@angular/router';
import { ResponseService } from '../../services/response.service';
import { UserInfo } from '../../models/users.interface';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  public constructor(public service: ResponseService, private router: Router) { }
  userData?: UserInfo;
  testHearts: boolean = false;
  @Input() book!: BookInfo; // el "!" evita error de null

  ngOnInit(): void {
    const userDataStorage = localStorage.getItem('userData');

    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
    }
  }

  onClickBookSelected() {
    this.router.navigate(['/showInfoBook', this.book.id]);
  }

  onClickFavouriteBook(idBook: number): void {
    this.testHearts = !this.testHearts;

    this.service.getLikeBooks(Number(this.userData?.id)).subscribe((response) => {
      const selectedFavourite = response.favourites.find((fav: any) => fav.id === idBook);

      if (!selectedFavourite) {
        this.service.addLikeBook(Number(this.userData?.id), idBook).subscribe({
          error: (err) => console.error('Error al añadir libro en favoritos:', err)
        });
      } else {
        this.service.deleteLikeBooks(Number(this.userData?.id), idBook).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Eliminado!",
              text: "Libro eliminado de favoritos",
              icon: "success",
              confirmButtonText: 'Aceptar'
            });
          },
          error: (err) => console.error('Error al eliminar libro en favoritos:', err)
        });
      }
    });
  }

} 
