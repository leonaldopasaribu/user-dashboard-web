import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../containers/user.component').then(m => m.UserComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../containers/user-list.component').then(
            m => m.UserListComponent,
          ),
      },
      {
        path: 'user/:id',
        loadComponent: () =>
          import('../containers/user-detail.component').then(
            m => m.UserDetailComponent,
          ),
      },
    ],
  },
];
