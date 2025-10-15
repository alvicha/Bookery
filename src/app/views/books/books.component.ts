import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../../services/response.service';
import { Categories } from '../../models/categories.interface';
import { BookInfo } from '../../models/books.interface';
import { CardComponent } from '../../components/card/card.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-books',
  imports: [CardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  public constructor(public service: ResponseService, private searchService: SearchService) { }
  categories: Categories[] = [];
  filteredBooks: BookInfo[] = [];
  selectedIdCategory: number = 0;
  urlCategoriesApi: string = "http://localhost:8000/api/showCategories";
  urlBooksByCategoryApi: string = "http://localhost:8000/api/listBookByCategory";
  urlBooksApi: string = "http://localhost:8000/api/showBooks";

  ngOnInit(): void {
    this.listCategoriesApi();
    this.listBooksApi();
  }

  filterBooksByCategory(idCategory: number) {
    this.selectedIdCategory = idCategory;

    this.service.getResponseBooks(`${this.urlBooksByCategoryApi}/${this.selectedIdCategory}`).subscribe((response) => {
      this.filteredBooks = response.dataBooks;
    })
  }

  listCategoriesApi() {
    this.service.getResponseBooks(this.urlCategoriesApi).subscribe((response) => {
      this.categories = response.categories;
    })
  }

  listBooksApi() {
    this.searchService.currentSearchText.subscribe(searchText => {
      if (searchText) {
        this.service.filterInfoBook(searchText).subscribe((response: any) => {
          this.filteredBooks = response.books;
        });
      } else {
        this.service.getResponseBooks(this.urlBooksApi).subscribe((response) => {
          this.filteredBooks = response.results;
        })
      }
    });
  }
}
