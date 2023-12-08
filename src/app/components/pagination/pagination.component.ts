import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 

@Component({
  selector: 'pk-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page = 1;
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();

  callPrevious() {
    this.previous.emit('ok');
  }

  callNext() {
    this.next.emit('ok');
  }
}
