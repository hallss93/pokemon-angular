import { Card } from './card.interface';

export interface Desk {
  descricao: string;
  nome: string;
  cards: Card[];
}
