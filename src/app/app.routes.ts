import { Routes } from '@angular/router';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { ReactiveForm } from './reactive-form/reactive-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: ReactiveForm },
  {
    path: 'events',
    loadChildren: () =>
      import('./event/EventRoutes').then((m) => m.eventRoutes),
  },

  { path: '**', component: NotFound },
];