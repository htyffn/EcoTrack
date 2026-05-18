import { Component, ChangeDetectionStrategy, signal, inject, computed, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WasteService, WasteState } from '../services/waste.service';

@Component({
  selector: 'app-waste-list',
  imports: [DatePipe],
  template: `
    <div class="space-y-6">
      <h2 class="font-geist-mono text-2xl font-light text-xai-white uppercase tracking-tight">
        WASTE INVENTORY
        <span class="text-text-tertiary text-base ml-3">({{ displayedWaste().length }})</span>
      </h2>

      <button
        type="button"
        (click)="filterPending.set(!filterPending())"
        [class]="filterPending() ? 'btn-primary w-full' : 'btn-ghost w-full'"
      >
        {{ filterPending() ? '✓ PENDING ONLY' : 'SHOW ALL' }}
      </button>

      @if (displayedWaste().length > 0) {
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          @for (waste of displayedWaste(); track waste.id) {
            <div class="card p-6 flex flex-col gap-4">

              <!-- Card Header -->
              <div class="flex items-start justify-between gap-2">
                <h3 class="font-geist-mono text-lg font-light text-xai-white uppercase tracking-tight leading-tight">
                  {{ waste.name }}
                </h3>
                <span
                  class="badge shrink-0"
                  [class]="typeClass(waste.type)"
                >{{ waste.type }}</span>
              </div>

              <!-- Card Meta -->
              <div class="flex flex-col gap-2 text-sm font-universal-sans">
                <div class="flex justify-between items-center border-b border-border-default pb-2">
                  <span class="text-text-tertiary">Weight</span>
                  <span class="text-text-primary font-geist-mono">{{ waste.weight }} KG</span>
                </div>
                <div class="flex justify-between items-center border-b border-border-default pb-2">
                  <span class="text-text-tertiary">Date</span>
                  <span class="text-text-primary">{{ waste.date | date: 'dd/MM/yyyy' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-tertiary">State</span>
                  <span
                    class="badge"
                    [class]="stateClass(waste.state)"
                  >{{ waste.state }}</span>
                </div>
              </div>

              <!-- Card Actions -->
              <div class="flex gap-2 pt-2 border-t border-border-default mt-auto">
                @if (waste.state === 'Pending') {
                  <button
                    (click)="updateState(waste.id, 'Processed')"
                    class="btn-ghost text-xs py-1 px-3 flex-1"
                  >
                    ✓ PROCESS
                  </button>
                } @else {
                  <button
                    (click)="updateState(waste.id, 'Pending')"
                    class="btn-ghost text-xs py-1 px-3 flex-1"
                  >
                    ↻ UNDO
                  </button>
                }
                <button
                  (click)="deleteWaste(waste.id)"
                  class="bg-red-900/30 border border-red-500/50 text-red-300 font-geist-mono text-xs uppercase tracking-button px-3 py-1 rounded-none cursor-pointer hover:bg-red-900/50 transition-colors flex-1"
                >
                  ✕ DELETE
                </button>
              </div>

            </div>
          }
        </div>
      } @else {
        <div class="card p-16 text-center">
          <p class="text-text-tertiary font-universal-sans text-lg mb-6">No waste items found</p>
          <button (click)="addNew.emit()" class="btn-primary">+ ADD FIRST ITEM</button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WasteListComponent {
  addNew = output<void>();

  private wasteService = inject(WasteService);

  filterPending = signal(false);

  displayedWaste = computed(() =>
    this.filterPending()
      ? this.wasteService.pendingWaste()
      : this.wasteService.wasteItems()
  );

  typeClass(type: string): string {
    switch (type) {
      case 'Dangerous':  return 'badge bg-red-900/30 border-red-500/50 text-red-300';
      case 'Recyclable': return 'badge bg-green-900/30 border-green-500/50 text-green-300';
      case 'Special':    return 'badge bg-amber-900/30 border-amber-500/50 text-amber-300';
      default:           return 'badge';
    }
  }

  stateClass(state: string): string {
    switch (state) {
      case 'Pending':   return 'badge bg-orange-900/30 border-orange-500/50 text-orange-300';
      case 'Processed': return 'badge bg-green-900/30 border-green-500/50 text-green-300';
      default:          return 'badge';
    }
  }

  updateState(id: string, newState: WasteState): void {
    this.wasteService.updateWasteState(id, newState);
  }

  deleteWaste(id: string): void {
    if (confirm('Are you sure you want to delete this waste item?')) {
      this.wasteService.removeWaste(id);
    }
  }
}
