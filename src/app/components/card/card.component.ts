import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Card } from '../../interfaces/card.interface';
import { DeskService } from '../../services/desk.service';
import { ActivatedRoute } from '@angular/router';
import { Desk } from '../../interfaces/desk.interface';

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
  @Output() remove = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private deskService: DeskService
  ) {}

  isHasThatCard = false;
  desk!: Desk;

  showCardDetails(card: any) {
    this.openDetail.emit(card);
  }

  addCard(card: Card) {
    this.add.next(card);
    this.checkCardHasOnDesk();
  }

  removeCard(card: Card) {
    this.remove.next(card);
    this.checkCardHasOnDesk();
  }

  checkCardHasOnDesk() {
    this.desk = this.deskService.getDesk(
      Number(this.route.snapshot.paramMap.get('id'))
    );

    this.isHasThatCard = this.desk.cards.some(
      (item) => item.name === this.card.name
    );
  }

  ngOnInit() {
    this.checkCardHasOnDesk();
  }
}
