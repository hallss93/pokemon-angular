import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Card } from '../../interfaces/card.interfacce';

@Component({
  selector: 'pk-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: any;
  @Output() openDetail = new EventEmitter();
  @Output() add = new EventEmitter();

  showCardDetails(card: any) {
    this.openDetail.emit(card);
  }

  addCard(card: Card) {
    this.add.next(card);
  }
}
