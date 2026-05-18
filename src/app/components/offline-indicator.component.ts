import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfflineService } from '../services/offline.service';

/**
 * Componente para mostrar el estado de conectividad y disponibilidad de actualizaciones.
 * Se muestra en la parte superior de la aplicación cuando está desconectada o hay actualizaciones.
 */
@Component({
  selector: 'app-offline-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <!-- Indicador Offline -->
      @if (!offlineService.isOnline()) {
        <div class="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white px-4 py-2 text-center">
          <span class="inline-block mr-2">📡</span>
          <strong>Modo sin conexión activado.</strong> Puedes continuar usando la aplicación con funcionalidad limitada.
        </div>
      }

      <!-- Indicador de Actualización Disponible -->
      @if (offlineService.updateAvailable()) {
        <div class="fixed top-12 left-0 right-0 z-50 bg-green-600 text-white px-4 py-3 text-center flex items-center justify-between">
          <span>
            <span class="inline-block mr-2">✨</span>
            <strong>Nueva versión disponible.</strong> Recarga la aplicación para obtener las mejoras más recientes.
          </span>
          <button
            (click)="offlineService.activateUpdate()"
            class="ml-4 bg-white text-green-600 px-3 py-1 rounded font-semibold hover:bg-green-50 transition"
          >
            Actualizar ahora
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class OfflineIndicatorComponent {
  offlineService = inject(OfflineService);
}
