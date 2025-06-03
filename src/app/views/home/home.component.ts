import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories = ['Fantasía', 'Ciencia Ficción', 'Romance', 'Terror', 'Aventura'];
  selectedCategory = '';
  searchText = '';

  constructor(
    private router: Router,
  ) {}

  books = [
    { title: 'El Hobbit', image: '../../../../images/hobbit.png', category: 'Fantasía' },
    { title: 'Cenicienta', image: '../../../../images/libro.png', category: 'Ciencia Ficción' },
    // ... más libros
  ];

  filteredBooks = [...this.books];

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  filterBooks() {
    this.applyFilters();
  }

  showBookById() {
    this.router.navigate(['/viewBook'])
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(book =>
      (!this.selectedCategory || book.category === this.selectedCategory) &&
      book.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  reserveBook(book: any) {
    alert(`Reservaste: ${book.title}`);
  }
}
