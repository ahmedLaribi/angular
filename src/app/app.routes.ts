import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Events } from './event/events'; // adapte selon ton chemin réel
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'events', component: Events },
  { path: '**', component: NotFound },
];