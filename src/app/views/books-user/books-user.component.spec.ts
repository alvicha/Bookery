import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksUserComponent } from './books-user.component';

describe('BooksUserComponent', () => {
  let component: BooksUserComponent;
  let fixture: ComponentFixture<BooksUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
