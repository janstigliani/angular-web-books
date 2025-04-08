import { Component, computed, effect, inject, signal } from '@angular/core';
import { BookService } from '../../serivices/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BookCardComponent } from '../book-card/book-card.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, BookCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  service: BookService = inject(BookService);
  books: Book[] = [];
  start = signal(0);
  end = signal(4);

  constructor() {
    effect(() => {
      this.books = this.service.booksArray().slice(this.start(), this.end());
      console.log(this.books)
      // this.end();
      // this.start();
      console.log("start: ", this.start(),"end: ", this.end())
    })
  }

  next8() {

    // if(this.end() % 32 != 0){
    //   this.start.update((oldvalue) => oldvalue += 4);
    //   this.end.update((oldvalue) => oldvalue += 4);
    // } else {
    //   this.service.nextPage();
    //   this.start.update((oldvalue) => oldvalue += 4);
    //   this.end.update((oldvalue) => oldvalue += 4);
    // }

    if (this.start() === 28) {
      this.start.set(0);
      this.end.set(4);
      this.service.nextPage()
    } else {
      this.start.update((oldvalue) => oldvalue += 4);
      this.end.update((oldvalue) => oldvalue += 4);
    }
    
    this.service.getAllBooks()
  }

  prev8() {
    // if(this.end() % 32 != 0){
    //   this.start.update((oldvalue) => oldvalue -= 4);
    //   this.end.update((oldvalue) => oldvalue -= 4);
    // } else {
    //   this.service.prevPage()
    //   this.start.update((oldvalue) => oldvalue -= 4);
    //   this.end.update((oldvalue) => oldvalue -= 4);
    //   if (this.start() < 0) {
    //     this.start.set(0)
    //   }
    // }

    // if (this.start() === 0) {
    //   this.start.set(28);
    //   this.end.set(32);
    //   this.service.prevPage()
    // } else {
    //   this.start.update((oldvalue) => oldvalue -= 4);
    //   this.end.update((oldvalue) => oldvalue -= 4);
    // }

    this.service.getAllBooks()
  }
}
