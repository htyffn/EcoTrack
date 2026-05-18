import { Injectable, signal, computed } from '@angular/core';

export type WasteType = 'Dangerous' | 'Recyclable' | 'Special';
export type WasteState = 'Pending' | 'Processed';

export interface Waste {
  id: string;
  name: string;
  type: WasteType;
  weight: number;
  date: Date;
  state: WasteState;
}

@Injectable({
  providedIn: 'root'
})
export class WasteService {
  private wasteList = signal<Waste[]>([
    {
      id: '1',
      name: 'Electronic Waste',
      type: 'Dangerous',
      weight: 15.5,
      date: new Date('2026-05-01'),
      state: 'Pending'
    },
    {
      id: '2',
      name: 'Plastic Bottles',
      type: 'Recyclable',
      weight: 8.2,
      date: new Date('2026-05-03'),
      state: 'Processed'
    },
    {
      id: '3',
      name: 'Chemical Waste',
      type: 'Dangerous',
      weight: 25.0,
      date: new Date('2026-05-05'),
      state: 'Pending'
    }
  ]);

  wasteItems = this.wasteList.asReadonly();

  pendingWaste = computed(() =>
    this.wasteList().filter(waste => waste.state === 'Pending')
  );

  addWaste(waste: Omit<Waste, 'id'>): void {
    const newId = Math.max(
      0,
      ...this.wasteList().map(w => parseInt(w.id, 10))
    ) + 1;

    this.wasteList.update(list => [
      ...list,
      { ...waste, id: newId.toString() }
    ]);
  }

  updateWasteState(id: string, newState: WasteState): void {
    this.wasteList.update(list =>
      list.map(waste =>
        waste.id === id ? { ...waste, state: newState } : waste
      )
    );
  }

  removeWaste(id: string): void {
    this.wasteList.update(list => list.filter(waste => waste.id !== id));
  }

  getWasteById(id: string): Waste | undefined {
    return this.wasteList().find(waste => waste.id === id);
  }
}
