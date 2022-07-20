import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
// import { baseUrl } from 'src/environments/environment.prod';
import { GLOBALS } from '../../utils/globals';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  constructor(
    private http: HttpClient,
    private _localStorageService: LocalStorageServiceEncrypt,
    @Inject(LOCAL_STORAGE) public storage: StorageService
  ) {}

  signup(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${baseUrl}auth/signup/`, data);
  }

  signin(data: any) {
    return this.http.post<any>(`${baseUrl}auth/signin`, data).pipe();
  }

  isLoggedIn() {
    if (this._localStorageService.get(GLOBALS.ACCESS_TOKEN)) {
      return true;
    }
    return false;
  }

  isExpiredToken(): any {
    let expireAt: any = this._localStorageService.get(
      GLOBALS.TOKEN_EXPIRE_TIME
    );
    if (expireAt) {
      if (expireAt < new Date().getMilliseconds()) {
        return true;
      } else {
        return false;
      }
    }
  }

  getAllBook(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${baseUrl}books`);
  }

  getAllBookSearch(search: string): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${baseUrl}books?name=${search}`);
  }

  getAllBookBorrow(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${baseUrl}books/borrow`);
  }

  getOneBook(id: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(baseUrl + 'books/' + id);
  }

  createBook(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${baseUrl}books`, data);
  }

  updateBook(id: any, data: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${baseUrl}books/${id}`, data);
  }

  deleteBook(id: any): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${baseUrl}books/${id}`);
  }
}
