import { Component, OnInit, inject }              from '@angular/core';
import { DatePipe }                                from '@angular/common';
import { MatCardModule }                           from '@angular/material/card';
import { MatTableModule }                          from '@angular/material/table';
import { MatPaginatorModule, PageEvent }           from '@angular/material/paginator';
import { MatProgressSpinnerModule }                from '@angular/material/progress-spinner';
import { MatIconModule }                           from '@angular/material/icon';
import { ClientStore }                             from '../../store/client.store';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientList implements OnInit {
  readonly store   = inject(ClientStore);
  readonly columns = ['name', 'email', 'documentNumber', 'phone', 'status'];

  ngOnInit(): void {
    this.store.loadClients({ page: 1, pageSize: 10 });
  }

  onPageChange(event: PageEvent): void {
    this.store.loadClients({ page: event.pageIndex + 1, pageSize: event.pageSize });
  }
}
