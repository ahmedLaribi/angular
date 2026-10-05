import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  likes: number;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  title = signal('Seance_1');
  searchTerm = signal('');

  products = signal<Product[]>([
    { id: 1, name: 'Product 1', price: 10, quantity: 5, likes: 0 },
    { id: 2, name: 'Product 2', price: 20, quantity: 3, likes: 0 },
    { id: 3, name: 'Product 3', price: 30, quantity: 0, likes: 0 },
    { id: 4, name: 'Product 4', price: 40, quantity: 2, likes: 0 },
    { id: 5, name: 'Product 5', price: 50, quantity: 6, likes: 0 },
  ]);

  // Liste filtrée selon le texte recherché (insensible à la casse)
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.products();
    return this.products().filter((p) =>
      p.name.toLowerCase().includes(term)
    );
  });

  totalValue = computed(() =>
    this.products().reduce((sum, p) => sum + p.price * p.quantity, 0)
  );

  likeProduct(id: number): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }

  removeProduct(id: number): void {
    this.products.update((list) => list.filter((p) => p.id !== id));
  }

  buyProduct(id: number): void {
    this.products.update((list) =>
      list.map((p) =>
        p.id === id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }
}