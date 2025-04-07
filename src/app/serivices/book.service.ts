import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  page:number = 1
  constructor() { 

  }

  async callApi() {
    const url= "https://gutendex.com/books/?page=" + this.page;
    const promisedData = await fetch(url).then(res => res.json())
  }
}
