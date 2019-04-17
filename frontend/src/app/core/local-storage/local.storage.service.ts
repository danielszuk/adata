import { Injectable } from '@angular/core';

import { LocalStorageKey } from './local.storage.key';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  public setItem(key: LocalStorageKey, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: LocalStorageKey): string {
    return localStorage.getItem(key);
  }

  public getItemAndRemove(key: LocalStorageKey): string {
    const item = localStorage.getItem(key);
    localStorage.removeItem(key);
    return item;
  }

  public removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}
