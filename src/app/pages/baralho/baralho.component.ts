import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
import { Card } from '../../interfaces/card.interfacce';
import { QueryParams } from '../../interfaces/query-params.interface';

import { PokemonService } from '../../services/pokemon.service';

import { CardComponent } from '../../components/card/card.component';
import { CardDetailsComponent } from '../../components/card-details/card-details.component';

@Component({
  selector: 'pk-baralho',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardDetailsComponent,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [PokemonService],
  templateUrl: './baralho.component.html',
  styleUrl: './baralho.component.scss',
})
export class BaralhoComponent {
  @ViewChild('drawer')
  drawer!: MatDrawer;

  characters$ = new Observable<Card[]>();
  queryParams!: QueryParams;
  emptyResult = false;
  resultsLength = 0;
  card!: Card;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  getCharacters() {
    this.characters$ = this.route.queryParams.pipe(
      debounceTime(300),
      switchMap((params) => {
        this.queryParams = {
          page: 1,
          pageSize: 30,
        };

        return this.getCards();
      }),
      take(1),
      shareReplay(1)
    );
  }

  getCards(): Observable<any> {
    return this.pokemonService.getAll(this.queryParams).pipe(
      map((res: any) => {
        console.log(res);
        if (res.data.length === 0) {
          this.emptyResult = true;
          this.characters$ = of([]);
          return;
        }
        this.emptyResult = false;
        this.resultsLength = res.totalCount;
        this.queryParams.pageSize = res.pageSize;
        this.characters$ = of(res.data);
      }),
      catchError(() => (this.characters$ = of([]))),
      shareReplay(1)
    );
  }

  showDetails(card: any) {
    this.card = card;
    this.drawer.open();
  }

  add(card: Card) {}

  ngOnInit() {
    this.getCharacters();
  }
}
