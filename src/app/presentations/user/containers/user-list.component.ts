import { Component } from '@angular/core';

import { USER_LIST_TABLE_COLUMN_HEADERS } from '../constants/user.constant';

import { TableComponent } from 'src/app/shared/components/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [TableComponent],
})
export class UserListComponent {
  readonly tableColumnHeaders = USER_LIST_TABLE_COLUMN_HEADERS;
}
