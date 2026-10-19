import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Home } from './home/home'; // tu peux le retirer si plus utilisé directement

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer], // ← Home n'est plus nécessaire ici, RouterOutlet doit y être
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app';
}


