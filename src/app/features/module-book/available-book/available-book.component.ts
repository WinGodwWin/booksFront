import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/core/service/service.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-available-book',
  templateUrl: './available-book.component.html',
  styleUrls: ['./available-book.component.scss'],
})
export class AvailableBookComponent implements OnInit {
  title = 'Liste des livres disponible';
  tabData?: Book[];
  isdisabled: boolean = true;
  closeResult = '';

  constructor(private apiservice: ServiceService) {}

  ngOnInit(): void {
    this.apiservice.getAllBookBorrow().subscribe((resp: any) => {
      this.tabData = resp.data;
    });
  }
}
