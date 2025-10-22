import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent } from "../../components/carousel/carousel.component";

@Component({
  selector: 'app-home',
  imports: [CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public constructor(private router: Router) { }
  testIconArrow: boolean = true;

  onClick(): void {
    this.router.navigate(['/view-about']);
  }

  onClickArrow(event: Event): void {
    event.preventDefault();
    this.testIconArrow = !this.testIconArrow;

    const aboutSection = document.getElementById('aboutMe');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
