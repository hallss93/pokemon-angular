import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, take } from 'rxjs';
import { Card } from '../interfaces/card.interface';
import { Desk } from '../interfaces/desk.interface';

@Injectable({
  providedIn: 'root',
})
export class DeskService {
  private itemsSubject = new BehaviorSubject<Desk[]>([]);
  items$ = this.itemsSubject.asObservable();
  existingDeskItems: Desk[] = [];

  constructor(private snackbar: MatSnackBar) {
    this.existingDeskItems = JSON.parse(localStorage.getItem('desk') || '[]');
    if (!this.existingDeskItems) {
      this.existingDeskItems = [];
    }
    this.itemsSubject.next(this.existingDeskItems);
  }

  createDesk(desk: Desk) {
    if (this.existingDeskItems.find((c) => c.nome === desk.nome)) {
      this.snackbar.open(`Baralho: ${desk.nome} 'já existe'`, 'Close', {
        panelClass: ['snackbar-fail'],
      });
      return;
    }

    this.items$
      .pipe(
        take(1),
        map((desks: Desk[]) => {
          desks.push(desk);
          localStorage.setItem('desk', JSON.stringify(desks));
          this.snackbar.open(`Baralho: ${desk.nome} 'criado'`, 'Close');
        })
      )
      .subscribe();
  }

  getAllDesks() {
    return this.existingDeskItems;
  }

  getDesk(index: number) {
    return this.existingDeskItems[index];
  }

  addCard(index: number, card: Card) {
    this.items$
      .pipe(
        take(1),
        map((desks: Desk[]) => {
          const item = desks[index];

          if (item.cards.find((c) => c.name === card.name)) {
            this.snackbar.open(
              `Card: ${card.name} 'já está no seu baralho'`,
              'Close',
              {
                panelClass: ['snackbar-fail'],
              }
            );
            return;
          }

          if (item.cards.length === 60) {
            this.snackbar.open(`Seu baralho já está cheio'`, 'Close', {
              panelClass: ['snackbar-fail'],
            });
            return;
          }

          item.cards.push(card);

          desks[index] = item;

          localStorage.setItem('desk', JSON.stringify(desks));

          this.snackbar.open(
            `Card: ${card.name} adicionado ao baralho ${item.nome}`,
            'Close'
          );
        })
      )
      .subscribe();
  }

  removeCard(index: number, card: Card) {
    this.items$
      .pipe(
        take(1),
        map((desks: Desk[]) => {
          try {
            const item = desks[index];

            if (item.cards.length <= 24) {
              this.snackbar.open(
                `Seu baralho está com o mínimo de 24 Cartas'`,
                'Close',
                {
                  panelClass: ['snackbar-fail'],
                }
              );
              return;
            }

            const cardToRemoveIndex = item.cards.findIndex(
              (c) => c.name === card.name
            );
            item.cards.splice(cardToRemoveIndex, 1);

            desks[index] = item;

            localStorage.setItem('desk', JSON.stringify(desks));

            this.snackbar.open(
              `Card: ${card.name} removido do baralho ${item.nome}`,
              'Close'
            );
          } catch (e) {
            this.snackbar.open(`Ocorreu um erro ${e}`, 'Close');
          }
        })
      )
      .subscribe();
  }
}
