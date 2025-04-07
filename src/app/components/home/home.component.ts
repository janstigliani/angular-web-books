import { Component, effect, inject } from '@angular/core';
import { BookService } from '../../serivices/book.service';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  service: BookService = inject(BookService);
  books: Book[] = [];
  constructor() {
    effect(() => {
      this.books = this.service.booksArray();
    })
    
  }
}
