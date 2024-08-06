import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class SessionStorageService {
  constructor() {}

  setItem(key: string, value: any): void {                          //Define um item no session storage
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = sessionStorage.getItem(key);                    //Recupera um item do session storage
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {                               //Remove um item específico do session storage
    sessionStorage.removeItem(key);
  }

  clear(): void {                                              //Remove todos os itens do session storage
    sessionStorage.clear();
  }
}
