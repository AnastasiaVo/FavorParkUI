import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor() {
    try {
      this.storage = window.localStorage;
    } catch {
      // When running in SSR, there's no window object
      this.storage = {
        length: 0,
        clear: () => {},
        getItem: (key: string) => null,
        key: (index: number) => null,
        removeItem: (key: string) => {},
        setItem: (key: string, value: string) => {},
      };
    }
  }

  get(key: string): string | null {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
