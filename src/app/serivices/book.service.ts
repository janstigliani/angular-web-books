import { Injectable, signal, WritableSignal } from '@angular/core';
import { Author, Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  nextUrl = "";
  prevUrl:string = "";
  booksArray: WritableSignal<Book[]> = signal([]);
  constructor() { 
    this.getAllBooks()
  }

  async callApi(url:string) {
    const baseUrl= url;
    const promisedData = await fetch(baseUrl).then(res => res.json());
    this.nextUrl = promisedData.next;
    this.prevUrl = promisedData.prev;
    return promisedData;
  }

  async getAllBooks(url?:any) {
    const data: Book[] = [];
    const rawData: any = await this.callApi(url? url : "https://gutendex.com/books/?page=1");
    for (const rawBook of rawData.results) {
      const rawAuthorsArray = rawBook.authors;
      const authorsArray: Author[] = [];
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

      data.push(book);

    }
  
    this.booksArray.set(data);

    return this.booksArray;
  }

  nextPage() {
    this.getAllBooks(this.nextUrl);
  }

  prevPage() {
    this.getAllBooks(this.prevUrl);
  }
}