import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Desk } from '../../interfaces/desk.interface';
import { DeskService } from '../../services/desk.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pk-desk-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './desk-details.component.html',
  styleUrl: './desk-details.component.scss',
})
export class DeskDetailsComponent {
  @Input() desk!: Desk;
  @Input() deskIndex!: number;
  pokemons = 0;
  trainers = 0;
  types = 0;

  constructor(
    private route: ActivatedRoute,
    private deskService: DeskService
  ) {}

  ngOnChanges() {
    this.pokemons = this.deskService.getCountPokemonHasOneDesk(this.deskIndex);
    this.trainers = this.deskService.getCountTrainerHasOneDesk(this.deskIndex);
    this.types = this.deskService.getCountTypesHasOneDesk(this.deskIndex);
  }
}
