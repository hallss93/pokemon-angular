import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
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
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '../../interfaces/query-params.interface';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pk-baralho',
  standalone: true,
  imports: [CommonModule, CardComponent],
  providers: [PokemonService],
  templateUrl: './baralho.component.html',
  styleUrl: './baralho.component.scss',
})
export class BaralhoComponent {
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

  showDetails(card: Card) {
    this.card = card;
  }

  add(card: Card) {}

  ngOnInit() {
    this.getCharacters();
  }
}
