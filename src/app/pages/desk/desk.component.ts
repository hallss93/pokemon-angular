import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  Observable,
  catchError,
  debounceTime,
  map,
  of,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { Card } from '../../interfaces/card.interface';
import { QueryParams } from '../../interfaces/query-params.interface';

import { PokemonService } from '../../services/pokemon.service';

import { CardComponent } from '../../components/card/card.component';
import { CardDetailsComponent } from '../../components/card-details/card-details.component';
import { DeskService } from '../../services/desk.service';
import { Desk } from '../../interfaces/desk.interface';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'pk-desk',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardDetailsComponent,
    PaginationComponent,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [PokemonService],
  templateUrl: './desk.component.html',
  styleUrl: './desk.component.scss',
})
export class BaralhoComponent {
  @ViewChild('drawer')
  drawer!: MatDrawer;

  characters$ = new Observable<Card[]>();
  queryParams!: QueryParams;
  emptyResult = false;
  card!: Card;
  desk!: Desk;
  page: number = 1;
  deskId: number = 0;
  pageSize = 50;
  totalPages = 0;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private deskService: DeskService
  ) {}

  getCharacters() {
    this.characters$ = this.route.queryParams.pipe(
      debounceTime(300),
      switchMap((params) => {
        this.queryParams = {
          page: this.page,
          pageSize: this.pageSize,
        };

        return this.getCards();
      }),
      take(1),
      shareReplay(1)
    );
  }

  getCards(): Observable<any> {
    this.isLoading = true;
    return this.pokemonService.getAll(this.queryParams).pipe(
      map((res: any) => {
        this.pageSize = res.pageSize;
        this.totalPages = Math.round(res.totalCount / this.pageSize);

        if (res.data.length === 0) {
          this.emptyResult = true;
          this.characters$ = of([]);
          return;
        }
        this.emptyResult = false;
        this.queryParams.pageSize = res.pageSize;
        this.characters$ = of(res.data);
        this.isLoading = false;
      }),
      catchError(() => (this.characters$ = of([]))),
      shareReplay(1)
    );
  }

  showDetails(card: Card) {
    this.card = card;
    this.drawer.open();
  }

  next() {
    if (this.page < this.totalPages) {
      this.page = this.page + 1;
      this.getCharacters();
    }
  }

  previous() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.getCharacters();
    }
  }

  add(card: Card) {
    this.deskService.addCard(this.deskId, card);
  }

  remove(card: Card) {
    this.deskService.removeCard(this.deskId, card);
  }

  ngOnInit() {
    this.deskId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCharacters();
    this.desk = this.deskService.getDesk(this.deskId);
  }
}
