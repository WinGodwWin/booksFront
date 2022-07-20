import { Component, OnInit } from '@angular/core';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { ServiceService } from 'src/app/core/service/service.service';
import { Book } from 'src/app/models/book';
import { GLOBALS } from 'src/app/utils/globals';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
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

  loading: boolean = false;

  visibilite: boolean = false;

  constructor(
    private apiservice: ServiceService,
    private _localStorageService: LocalStorageServiceEncrypt
  ) {
    this.error = '';
    this.payload = this._localStorageService.get(GLOBALS.CURRENT_USER);
  }

  ngOnInit(): void {}

  addItem() {
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

    this.apiservice.createBook(data).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.message = res.message
          ? res.message
          : 'Information enregistré avec succès';
        this.book = {
          _id: '',
          name: undefined,
          description: '',
          disponible: false,
          image: '',
          updatedAt: '',
          nametheme: '',
          user: '',
        };
      },
      error: (e) => {
        this.loading = false;

        if (e.status === 404)
          this.error = 'Erreur survenu. Veuillez reessayer plutard!';
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
