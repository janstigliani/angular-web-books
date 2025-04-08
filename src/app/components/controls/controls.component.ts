import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookService } from '../../serivices/book.service';

@Component({
  selector: 'app-controls',
  imports: [CommonModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {
  service = inject(BookService);
  next() {
    this.service.nextPage();
  }

  prev() {
    this.service.prevPage();
  }
}
