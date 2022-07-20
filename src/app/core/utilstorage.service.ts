import { Inject, Injectable } from '@angular/core';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class UtilStorageService {
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private _localStorageService: LocalStorageServiceEncrypt
  ) {}

  StoreItem(key: any, item: any): void {
    this._localStorageService.set(key, item);
  }

  GetItem(key: any): any {
    return this._localStorageService.get(key);
  }

  RemoveItem(key: any): void {
    this.storage.remove(key);
  }

  ClearStorage(): void {
    this.storage.clear();
  }
}
