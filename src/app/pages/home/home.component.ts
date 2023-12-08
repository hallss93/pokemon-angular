import { Component } from '@angular/core';
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

@Component({
  selector: 'pk-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  nome!: string;
  descricao!: string;
  desks: Desk[] = [];

  constructor(public dialog: MatDialog, private deskService: DeskService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDeskComponent, {
      data: { nome: this.nome, descricao: this.descricao, cards: [] },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.deskService.createDesk(result);
    });
  }

  ngOnInit() {
    this.desks = this.deskService.getAllDesks();
  }
}
