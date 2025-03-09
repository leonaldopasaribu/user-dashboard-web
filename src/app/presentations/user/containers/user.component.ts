import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from 'src/app/shared/components/sidebar';

@Component({
  templateUrl: './user.component.html',
  imports: [RouterOutlet, SidebarComponent],
})
export class UserComponent {}
