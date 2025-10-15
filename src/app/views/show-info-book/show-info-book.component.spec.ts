import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInfoBookComponent } from './show-info-book.component';

describe('ShowInfoBookComponent', () => {
  let component: ShowInfoBookComponent;
  let fixture: ComponentFixture<ShowInfoBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowInfoBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowInfoBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
