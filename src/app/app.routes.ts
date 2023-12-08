import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BaralhoComponent } from './pages/desk/desk.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  {
    path: 'desk/:id',
    component: BaralhoComponent,
    title: 'desk',
  },
];
