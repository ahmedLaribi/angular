import { Component, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { eventsList } from '../events';
@Component({
  selector: 'app-detail-evnt',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './detail-evnt.html',
  styleUrl: './detail-evnt.css',
})
export class DetailEvnt {
  // l'id vient de l'URL : /evenements/2 -> 2
  id: number;

  constructor(route: ActivatedRoute) {
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  event = computed(() => eventsList().find((e) => e.id === this.id));

  reserve(): void {
    eventsList.update((list) =>
      list.map((e) =>
        e.id === this.id && e.nbPlaces > 0
          ? { ...e, nbPlaces: e.nbPlaces - 1 }
          : e
      )
    );
  }
}