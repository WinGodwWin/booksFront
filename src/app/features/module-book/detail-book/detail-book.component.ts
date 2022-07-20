import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { ServiceService } from 'src/app/core/service/service.service';
import { Book } from 'src/app/models/book';
import { GLOBALS } from 'src/app/utils/globals';
import { Role } from 'src/app/utils/roles.models';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss'],
})
export class DetailBookComponent implements OnInit {
  title = 'Livre';
  viewMode: boolean = true;

  book: Book = {
    _id: '',
    name: undefined,
    description: '',
    disponible: false,
    image: '',
    updatedAt: '',
    nametheme: '',
    user: '',
  };

  error: string;

  message: string = '';

  payload: any;

  loading: boolean = true;

  visibilite: boolean = false;

  constructor(
    private apiservice: ServiceService,
    private _localStorageService: LocalStorageServiceEncrypt,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.error = '';
    this.payload = this._localStorageService.get(GLOBALS.CURRENT_USER);

    this.apiservice
      .getOneBook(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (resp: any) => {
          this.book = resp.data;
          this.loading = false;
          if (this.book?.user == this.payload.id) this.visibilite = true;
        },
        error: (e) => {
          this.loading = false;

          if (e.status === 404)
            this.error =
              'Les informations sur ce livre ne sont pas accessible. Veuillez reessayer plutard!';
        },
      });
  }

  ngOnInit(): void {}

  modifierItem() {
    this.viewMode = false;
  }

  deleteItem() {
    this.loading = true;

    this.apiservice.deleteBook(this.book._id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = 'Suppression reussi';
        this.router.navigate(['/book/all']);
      },
      error: (e) => {
        this.loading = false;
        if (e.status === 404) this.error = 'Ce livre ne peut etre supprimer';
      },
    });
  }

  updateDisponible(status: boolean) {
    this.loading = true;
    this.error = '';

    const data = {
      name: this.book.name,
      description: this.book.description,
      disponible: status,
      nametheme: this.book.nametheme,
      image: this.book.image,
      user: this.payload.id,
    };

    this.message = '';

    this.apiservice.updateBook(this.book._id, data).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.book.disponible = status;
        this.message = res.message
          ? res.message
          : 'Statut mis a jour avec succès';
      },
      error: (e) => {
        this.loading = false;

        if (e.status === 404)
          this.error =
            'Les informations sur ce livre ne peuvent etre mis a jour. Veuillez reessayer plutard!';
      },
    });
  }

  updateItem() {
    this.loading = true;
    this.error = '';

    const data = {
      name: this.book.name,
      description: this.book.description,
      disponible: this.book.disponible,
      nametheme: this.book.nametheme,
      image: this.book.image,
      user: this.payload.id,
    };

    this.message = '';

    this.apiservice.updateBook(this.book._id, data).subscribe({
      next: (res: any) => {
        this.loading = false;

        this.viewMode = true;
        this.message = res.message
          ? res.message
          : 'Information mis a jour avec succès';
      },
      error: (e) => {
        this.loading = false;

        if (e.status === 404)
          this.error =
            'Les informations sur ce livre ne peuvent etre mis a jour. Veuillez reessayer plutard!';
      },
    });
  }

  //image
  onUploadChange(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.book.image = 'data:image/png;base64,' + btoa(binaryString);
  }
}
