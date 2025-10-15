import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { ResponseService } from '../../services/response.service';
import { SearchService } from '../../services/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor(public service: ResponseService, private searchService: SearchService, private router: Router) { }
  searchText = '';
  data: any;

  reactiveForm = new FormGroup({
    searchQuery: new FormControl('', { nonNullable: true }),
  });

  onSearch() {
    this.searchText = this.reactiveForm.getRawValue().searchQuery;
    this.searchService.setSearchText(this.searchText);
    this.router.navigate(['/books']);
  }

  ngOnInit(): void {
    this.reactiveForm.get('searchQuery')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.searchText = value;
        this.searchService.setSearchText(this.searchText);
      });
  }
}
