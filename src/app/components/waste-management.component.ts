import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { WasteFormComponent } from './waste-form.component';
import { WasteListComponent } from './waste-list.component';

type ActiveView = 'list' | 'form';

@Component({
  selector: 'app-waste-management',
  imports: [WasteFormComponent, WasteListComponent],
  template: `
    <div class="min-h-screen bg-xai-dark pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="section-container max-w-6xl">

        <header class="page-header mb-10 md:mb-16">
          <h1 class="font-geist-mono text-5xl md:text-6xl font-light text-xai-white mb-4 tracking-tight">
            WASTE MANAGEMENT
          </h1>
          <p class="text-text-secondary text-lg md:text-xl font-universal-sans max-w-2xl mx-auto">
            Manage and track your waste inventory with precision
          </p>
        </header>

        <!-- Navigation -->
        <nav class="grid grid-cols-2 gap-4 mb-10">
          <button
            (click)="activeView.set('list')"
            [class]="activeView() === 'list' ? 'btn-primary' : 'btn-ghost'"
          >
            ☰ INVENTORY
          </button>
          <button
            (click)="activeView.set('form')"
            [class]="activeView() === 'form' ? 'btn-primary' : 'btn-ghost'"
          >
            + ADD WASTE
          </button>
        </nav>

        <!-- Views -->
        @if (activeView() === 'form') {
          <app-waste-form (submitted)="activeView.set('list')"></app-waste-form>
        } @else {
          <app-waste-list (addNew)="activeView.set('form')"></app-waste-list>
        }

      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WasteManagementComponent {
  activeView = signal<ActiveView>('list');
}
