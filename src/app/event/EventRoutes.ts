import { Routes } from '@angular/router';
import { Events } from './events';
import { DetailEvnt } from './detail-evnt/detail-evnt';

export const eventRoutes: Routes = [
  { path: '', component: Events },
  { path: ':id', component: DetailEvnt },
];