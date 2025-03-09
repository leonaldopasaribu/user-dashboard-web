import { Component, input } from '@angular/core';

import { TableColumnHeader } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  columnHeaders = input<TableColumnHeader[]>([]);
}
