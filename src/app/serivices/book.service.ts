import { Injectable, signal, WritableSignal } from '@angular/core';
import { Author, Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // page = 1;
  // actUrl = "https://gutendex.com/books/?page="+this.page;
  nextUrl = "";
  prevUrl:string = "";
  booksArray: WritableSignal<Book[]> = signal([]);
  constructor() { 
    this.getAllBooks()
  }

  async callApi(url:string) {
    const baseUrl= url;
    const promisedData = await fetch(baseUrl).then(res => res.json());
    this.nextPage = promisedData.next;
    this.prevPage = promisedData.prev;
    return promisedData;
  }

  async getAllBooks(url?:string) {
    const data: Book[] = [];
    const rawData: any = await this.callApi(url? url : "https://gutendex.com/books/?page=1");
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

  nextPage() {
    this.getAllBooks(this.nextPage);
  }

  prevPage() {
    this.getAllBooks(this.prevPage);
  }
}