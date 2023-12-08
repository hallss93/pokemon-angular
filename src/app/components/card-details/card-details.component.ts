import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'pk-card-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.scss',
})
export class CardDetailsComponent {
  @Input() card!: Card;
}
