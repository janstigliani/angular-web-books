import { Injectable, signal, WritableSignal } from '@angular/core';
import { Author, Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  page:number = 1
  booksArray: WritableSignal<Book[]> = signal([])
  constructor() { 
    this.getAllBooks()
  }

  async callApi() {
    const url= "https://gutendex.com/books/?page=" + this.page;
    const promisedData = await fetch(url).then(res => res.json());
    return promisedData;
  }

  async getAllBooks() {
    const data: Book[] = [];
    const rawData: any = await this.callApi();
    console.log(rawData);
    for (const rawBook of rawData.results) {
      const rawAuthorsArray = rawBook.authors;
      const authorsArray: Author[] = [];
      console.log(rawBook);
      for (const author of rawAuthorsArray) {
        const newAuthor: Author = {
          doB: author.birth_year,
          doD: author.death_year,
          name: author.name
        };
        authorsArray.push(newAuthor);
      }
  
      const book: Book = {
        id: rawBook.id,
        title: rawBook.title,
        authors: authorsArray,
        summaries: rawBook.summaries,
        img: rawBook.formats["image/jpeg"] 
      };
      console.log("libro", book);
      data.push(book);
      console.log("porco", data);
    }
  
    this.booksArray.set(data);
    
    console.log(this.booksArray);

    return this.booksArray;
  }
}