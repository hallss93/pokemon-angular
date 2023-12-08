import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateDeskComponent } from '../../components/create-desk/create-desk.component';
import { DeskService } from '../../services/desk.service';
import { Desk } from '../../interfaces/desk.interface';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeskDetailsComponent } from '../../components/desk-details/desk-details.component';

@Component({
  selector: 'pk-home',
  standalone: true,
  imports: [
    DeskDetailsComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('drawer')
  drawer!: MatDrawer;

  nome!: string;
  descricao!: string;
  desks: Desk[] = [];
  desk!: Desk;
  deskIndex = 0;

  constructor(public dialog: MatDialog, private deskService: DeskService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDeskComponent, {
      data: { nome: this.nome, descricao: this.descricao, cards: [] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.deskService.createDesk(result);
    });
  }

  showDetails(desk: Desk, index: number) {
    this.desk = desk;
    this.deskIndex = index;
    this.drawer.open();
  }

  removeDesk() {
    this.deskService.removeDesk(this.deskIndex);
    this.drawer.close();
  }

  ngOnInit() {
    this.desks = this.deskService.getAllDesks();
  }
}
