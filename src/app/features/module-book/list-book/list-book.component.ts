import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/service/service.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss'],
})
export class ListBookComponent implements OnInit {
  title = 'Liste des livres disponible';
  tabData?: Book[];
  isdisabled: boolean = true;
  closeResult = '';
  mocles: string = '';
  constructor(private apiservice: ServiceService) {}

  ngOnInit(): void {
    this.apiservice.getAllBook().subscribe((resp: any) => {
      this.tabData = resp.data;
    });
  }

  rechercher() {
    if (this.mocles == '' || this.mocles == undefined) this.clean();
    else
      this.apiservice.getAllBookSearch(this.mocles).subscribe((resp: any) => {
        this.tabData = resp.data;
      });
  }

  clean() {
    this.mocles = '';
    this.apiservice.getAllBook().subscribe((resp: any) => {
      this.tabData = resp.data;
    });
  }
}
