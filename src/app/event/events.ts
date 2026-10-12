import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface EventMl {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  price: number;
  nbPlaces: number;
}

// Données exportées : le composant détail les importe depuis ce fichier
export const eventsList = signal<EventMl[]>([
  {
    id: 1,
    title: 'Conférence Angular',
    date: '2026-10-15',
    location: 'Tunis',
    description: 'Une conférence sur les nouveautés Angular.',
    price: 20,
    nbPlaces: 50,
  },
  {
    id: 2,
    title: 'Workshop Spring Boot',
    date: '2026-11-02',
    location: 'Sousse',
    description: 'Atelier pratique sur Spring Boot et les API REST.',
    price: 15,
    nbPlaces: 30,
  },
  {
    id: 3,
    title: 'Meetup DevOps',
    date: '2026-11-20',
    location: 'Sfax',
    description: 'Rencontre autour des pratiques DevOps modernes.',
    price: 0,
    nbPlaces: 0,
  },
]);

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [FormsModule, DatePipe, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  searchTerm = signal('');
  events = eventsList;

  filteredEvents = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.events();
    return this.events().filter(
      (e) =>
        e.title.toLowerCase().includes(term) ||
        e.location.toLowerCase().includes(term)
    );
  });

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  reserveEvent(id: number): void {
    this.events.update((list) =>
      list.map((e) =>
        e.id === id && e.nbPlaces > 0
          ? { ...e, nbPlaces: e.nbPlaces - 1 }
          : e
      )
    );
  }

  removeEvent(id: number): void {
    this.events.update((list) => list.filter((e) => e.id !== id));
  }
}