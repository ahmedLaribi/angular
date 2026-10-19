import { Component, signal, computed } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  imports: [FormsModule, ReactiveFormsModule, DatePipe, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  // ---------- Liste et recherche ----------
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

  // ---------- Formulaire d'ajout ----------
  showForm = false;

  private readonly emptyForm = {
    title: '',
    description: '',
    date: '',
    location: '',
    price: 0,
    nbPlaces: 1,
  };

  eventForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', { nonNullable: true }),
    date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    location: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    nbPlaces: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  // Raccourcis pour le HTML
  get title() { return this.eventForm.controls.title; }
  get date() { return this.eventForm.controls.date; }
  get location() { return this.eventForm.controls.location; }
  get price() { return this.eventForm.controls.price; }
  get nbPlaces() { return this.eventForm.controls.nbPlaces; }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.eventForm.reset(this.emptyForm);
    }
  }

  addEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const value = this.eventForm.getRawValue();

    this.events.update((list) => {
      const nextId = list.length ? Math.max(...list.map((e) => e.id)) + 1 : 1;
      return [...list, { id: nextId, ...value }];
    });

    this.eventForm.reset(this.emptyForm);
    this.showForm = false;
  }
}