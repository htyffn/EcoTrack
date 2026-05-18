import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OfflineIndicatorComponent } from './components/offline-indicator.component';
import { OfflineService } from './services/offline.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OfflineIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EcoTrack');
  private offlineService = inject(OfflineService);
}
