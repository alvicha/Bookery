import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../../services/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '../../models/books.interface';
import { ModalComponent } from '../../components/modal/modal.component';
import { TabsModule } from 'primeng/tabs';
import { NgClass } from '@angular/common';
import { UserInfo } from '../../models/users.interface';
import Swal from 'sweetalert2';
import { SearchService } from '../../services/search.service';
import { ModalReviewsComponent } from "../../components/modal-reviews/modal-reviews.component";

@Component({
  selector: 'app-show-info-book',
  imports: [ModalComponent, NgClass, TabsModule, ModalReviewsComponent],
  templateUrl: './show-info-book.component.html',
  styleUrl: './show-info-book.component.css'
})
export class ShowInfoBookComponent implements OnInit {

  constructor(public service: ResponseService, private searchService: SearchService, private activateRouter: ActivatedRoute, private router: Router) { }
  idBook: string | null = null;
  urlDataBook: string = "http://localhost:8000/api/showBook";
  book!: BookInfo; // el "!" evita error de null
  modal: string = "modal";
  responseBooking: string | null = null;
  bookAdded: boolean = false;
  userData?: UserInfo;
  tabs: { title: string; value: number }[] = [];
  modalReviews: string = "modal";
  listReview: any[] = [];
  averageRating: number = 0;
  recordIdBook: number | null = null;
  visibleReviews: number = 3;

  ngOnInit(): void {
    this.tabs = [
      { title: 'Todas', value: 0 },
      { title: 'Más valoradas', value: 1 },
    ];

    const userDataStorage = localStorage.getItem('userData');
    this.idBook = this.activateRouter.snapshot.paramMap.get('id');

    this.service.getResponseBooks(`${this.urlDataBook}/${this.idBook}`).subscribe((response) => {
      this.book = response;
    });
    this.getReviewsByBook();

    if (userDataStorage) {
      this.userData = JSON.parse(userDataStorage);
      this.searchService.getCart(Number(this.userData?.id));

      this.searchService.currentBooks.subscribe((books: any) => {
        books.forEach((element: BookInfo) => {
          if (Number(this.idBook) === element.id) {
            this.searchService.setBookAdded(element.id, true);
          }
        });
      })

      this.searchService.currentBookAdded.subscribe((map) => {
        this.bookAdded = !!map[Number(this.idBook)]; // true si está agregado, false si no
      });

      this.addBookToRecord();
    }
  }

  onOpenReviews(): void {
    this.modalReviews = "modal show-modal";
  }

  getReviewsByBook(): void {
    this.service.getReviewsByBook(Number(this.idBook)).subscribe((response) => {
      this.listReview = response.reviews.map((review: any) => {
        const fecha = new Date(review.fecha);
        return {
          ...review,
          fechaString: fecha.toLocaleDateString('es-ES')
        };
      });


      if (this.visibleReviews > 3) {
        this.visibleReviews = this.listReview.length;
      }

      if (this.listReview.length > 0) {
        const total = this.listReview.reduce((acc, review) => acc + review.puntuacion, 0);
        this.averageRating = Math.round(total / this.listReview.length);
      }
    });
  }

  addBookToRecord(): void {
    this.service.getRecordByUser(Number(this.userData?.id)).subscribe((response) => {
      const record = response.records.find((rec: any) => rec.id === Number(this.idBook));

      if (!record) {
        this.service.addBookToRecord(Number(this.userData?.id), Number(this.idBook)).subscribe({
          error: (err) => console.error('Error al añadir libro:', err)
        });
      }
    });
  }

  onAddToCart(): void {
    this.responseBooking = null;

    if (this.userData) {
      this.searchService.addToCart(Number(this.userData.id), Number(this.idBook));
      this.searchService.setBookAdded(Number(this.idBook), true);
      this.modal = "modal show-modal";
    } else {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: 'Debes de iniciar sesión primero',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: `
          <i class="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
        `,
        confirmButtonAriaLabel: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }

  onClose(): void {
    this.modal = 'modal';
  }

  onCloseReviews(): void {
    this.modalReviews = 'modal';
    this.getReviewsByBook();
  }

  showMoreProjects(): void {
    this.visibleReviews = this.listReview.length;
  }
}