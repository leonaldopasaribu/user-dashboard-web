import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/presentations/user/routes/user.routes').then(
        m => m.routes,
      ),
  },
];
