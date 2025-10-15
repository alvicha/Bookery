import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ResponseService } from '../../services/response.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  imports: [Carousel, ButtonModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css'
})

export class RecordComponent implements OnInit {
  public constructor(public service: ResponseService, private router: Router) { }
  responsiveOptions: any[] = [];
  recordsUser: any[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.service.getRecordByUser(Number(userId)).subscribe((response) => {
        this.recordsUser = response.records.map((record: any) => {
          const fecha = new Date(record.fecha);
          return {
            ...record,
            fechaString: fecha.toLocaleDateString('es-ES')
          };
        });
        console.log(this.recordsUser);
      });
    }

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  goToBook(idBook: number) {
    this.router.navigate(['/showInfoBook', idBook]);
  }
}
