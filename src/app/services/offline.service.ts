import { inject, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';

/**
 * Servicio para gestionar la capacidad offline de la aplicación PWA.
 * Controla el estado de conectividad y notifica sobre actualizaciones disponibles.
 */
@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private swUpdate = inject(SwUpdate);

  // Señal para rastrear el estado de conectividad
  isOnline = signal(navigator.onLine);

  // Señal para indicar si hay una actualización disponible
  updateAvailable = signal(false);

  constructor() {
    this.initializeOnlineMonitoring();
    this.initializeUpdateCheck();
  }

  /**
   * Inicializa la monitorización del estado de conectividad
   */
  private initializeOnlineMonitoring(): void {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      console.log('Aplicación conectada a internet');
    });

    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      console.log('Aplicación desconectada de internet - Modo offline activado');
    });
  }

  /**
   * Inicializa la verificación de actualizaciones del Service Worker
   */
  private initializeUpdateCheck(): void {
    if (this.swUpdate.isEnabled) {
      // Verifica actualizaciones cada 30 segundos si está online
      setInterval(() => {
        if (this.isOnline()) {
          this.swUpdate.checkForUpdate().catch(err => {
            console.warn('Error al verificar actualizaciones:', err);
          });
        }
      }, 30000);

      // Notifica cuando hay una actualización disponible
      this.swUpdate.versionUpdates
        .pipe(
          filter(evt => evt.type === 'VERSION_READY')
        )
        .subscribe(() => {
          this.updateAvailable.set(true);
          console.log('Nueva versión disponible');
        });
    }
  }

  /**
   * Activa la actualización disponible
   */
  activateUpdate(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => {
        window.location.reload();
      });
    }
  }

  /**
   * Obtiene el estado de conectividad actual
   */
  getOnlineStatus(): boolean {
    return this.isOnline();
  }

  /**
   * Limpia los cachés antiguos para liberar espacio
   */
  async cleanupCache(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const outdatedCaches = cacheNames.filter(name => name !== 'ngsw:db:control');
      await Promise.all(outdatedCaches.map(name => caches.delete(name)));
      console.log('Cachés limpiados correctamente');
    }
  }

  /**
   * Obtiene el tamaño total del caché almacenado
   */
  async getCacheSize(): Promise<number> {
    if (!('storage' in navigator) || !navigator.storage.estimate) {
      return 0;
    }

    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
}
