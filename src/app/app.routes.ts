import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'events',
    loadChildren: () =>
      import('./event/EventRoutes').then((m) => m.eventRoutes),
  },

  { path: '**', component: NotFound },
];