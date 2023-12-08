import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BaralhoComponent } from './pages/baralho/baralho.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  {
    path: 'baralho/:id',
    component: BaralhoComponent,
    title: 'baralho',
  },
];
