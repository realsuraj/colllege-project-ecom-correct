import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  
  private data = [];
  setData(key, data) {
    this.data[key] = data;
  }
  getData(key) {
    return this.data[key];
  }
}
